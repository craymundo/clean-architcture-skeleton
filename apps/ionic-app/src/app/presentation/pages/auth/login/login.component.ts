import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Platform } from '@ionic/angular';

const { Storage } = Plugins;

@Component({
  selector: 'auna-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  constructor(
    private platform: Platform,
    private screenOrientation: ScreenOrientation,

  ) {
  }

  
  ngOnInit() {
    // TODO: Fix temporal hasta solucionar todos los loading.
   

    if (this.platform.is('cordova'))
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

 
}
