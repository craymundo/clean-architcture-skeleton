import { Injectable } from '@angular/core';
import { AngularFireRemoteConfig } from '@angular/fire/remote-config';
import { FirebaseConfig } from '@ionic-native/firebase-config/ngx';
import { Platform } from '@ionic/angular';

import { Logger } from '../../../../../libs/core/logger';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  log = Logger.create(this.constructor.name);

  constructor(
    private platform: Platform,
    private firebaseConfig: FirebaseConfig,
    private remoteConfig: AngularFireRemoteConfig
  ) {
    if (this.platform.is('capacitor')) {
      try {
        this.firebaseConfig.fetch(0);
      } catch (err) {
        this.log.error(err);
      }
    }
  }

  getKey(key): Promise<any> {
    try {
      return this.firebaseConfig.fetchAndActivate().then(() => {
        return this.firebaseConfig.getString(key);
      });
    } catch (err) {
      return this.remoteConfig.strings[key].toPromise();
    }
  }

  async getKeyWithoutCache(key: RemoteKey | string): Promise<any> {
    try {
      return this.firebaseConfig.fetchAndActivate().then(() => {
        return this.firebaseConfig.getString(key.toString());
      });
    } catch (err) {
      return await this.remoteConfig.strings[key.toString()].toPromise();
    }
  }
}

export enum RemoteKey {
  PublicKey = 'public_key',
  EndPoints = 'end_points',
  StartRatingDelay = 'start_rating_delay',
  WaitingRoomDelay = 'waiting_room_delay',
  EncriptionKey = 'public_key',
}
