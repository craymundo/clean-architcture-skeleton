import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';

import { environment } from '../../../../../libs/core';
import { RemoteConfigService } from './remoteconfig.service';

const { Device } = Plugins;
const defaultVersion = '1.0.0';

interface AppVersion {
  min_version: string;
  version: string;
  required: boolean;
}

interface AppVersions {
  android: AppVersion;
  ios: AppVersion;
}

export interface UpdateVersion {
  isAvailable: boolean;
  required: boolean;
  version: string;
  link: string;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(
    private platform: Platform,
    private remoteConfigService: RemoteConfigService
  ) { }

  async existsNewVersion(): Promise<UpdateVersion> {
    const info = await Device.getInfo();
    const versionsStrings = await this.remoteConfigService.getKeyWithoutCache(
      environment.APP_VERSIONS
    );
    const versions = JSON.parse(versionsStrings) as AppVersions;
    const currentVersion = info.appVersion || defaultVersion;

    if (this.platform.is('android')) {
      const [isAvailable, required] = this.compareVersions(
        currentVersion,
        versions.android
      );

      return {
        isAvailable,
        required,
        version: versions.android.version,
        link: environment.Google
      };
    }

    if (this.platform.is('ios')) {
      const [isAvailable, required] = this.compareVersions(
        currentVersion,
        versions.ios
      );

      return {
        isAvailable,
        required,
        version: versions.ios.version,
        link: environment.Apple,
      };
    }

    /*
    const [isAvailable, required] = this.compareVersions(
      currentVersion,
      versions.android
    );

    return {
      isAvailable,
      required,
      version: versions.android.version,
      link: 'https://play.google.com/store/apps/details?id=pe.com.mdp.auna',
    };
    */

    return {
      isAvailable: false,
      required: false,
      version: null,
      link: '',
    };
  }

  private compareVersions(
    currentVersion: string,
    versions: AppVersion
  ): [boolean, boolean] {
    if (this.compare(versions.min_version, currentVersion) === 1)
      return [true, true];

    if (this.compare(versions.version, currentVersion) === 1) {
      return [true, versions.required];
    }

    return [false, false];
  }

  private indexOrEnd(value: string, character: string): number {
    return value.indexOf(character) === -1
      ? value.length
      : value.indexOf(character);
  }

  private split(version: string): string[] {
    const c = version.replace(/^v/, '').replace(/\+.*$/, '');
    const patchIndex = this.indexOrEnd(c, '-');
    const arr = c.substring(0, patchIndex).split('.');

    arr.push(c.substring(patchIndex + 1));

    return arr;
  }

  private tryParse(version: string) {
    return isNaN(Number(version)) ? version : Number(version);
  }

  private compare(v1: string, v2: string): number {
    const s1 = this.split(v1);
    const s2 = this.split(v2);

    for (let i = 0; i < Math.max(s1.length - 1, s2.length - 1); i++) {
      const n1 = parseInt(s1[i] || '0', 10);
      const n2 = parseInt(s2[i] || '0', 10);

      if (n1 > n2) return 1;
      if (n2 > n1) return -1;
    }

    const sp1 = s1[s1.length - 1];
    const sp2 = s2[s2.length - 1];

    if (sp1 && sp2) {
      const p1 = sp1.split('.').map(this.tryParse);
      const p2 = sp2.split('.').map(this.tryParse);

      for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
        if (
          p1[i] === undefined ||
          (typeof p2[i] === 'string' && typeof p1[i] === 'number')
        )
          return -1;
        if (
          p2[i] === undefined ||
          (typeof p1[i] === 'string' && typeof p2[i] === 'number')
        )
          return 1;

        if (p1[i] > p2[i]) return 1;
        if (p2[i] > p1[i]) return -1;
      }
    } else if (sp1 || sp2) {
      return sp1 ? -1 : 1;
    }

    return 0;
  }
}
