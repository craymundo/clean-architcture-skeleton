import { Component } from '@angular/core';

import {  Plugins } from '@capacitor/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ModalController, Platform } from '@ionic/angular';

const { CapacitorFirebaseDynamicLinks } = Plugins;

import { Logger } from '../../../../libs/core/logger';


const { App, StatusBar, SplashScreen, Device, Storage } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isAvailableUpdate = false;
  appUrl = '';
  modalParams = {};
  modalVisible = false;
  isMaintenance = false;
  modalVisibleMaintenance = false;
  offsetY: any;
  sizeKeyBoard: any;
  isKeyboardOpen = false;

  log = Logger.create(this.constructor.name);

  constructor(
    private platform: Platform,
    private screenOrientation: ScreenOrientation,
    public modalController: ModalController
  ) {
    if (this.platform.is('cordova')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }
}
