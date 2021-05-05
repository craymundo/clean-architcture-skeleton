import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireRemoteConfigModule } from '@angular/fire/remote-config';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { firebaseConfig } from '@auna-workspace/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FirebaseConfig } from '@ionic-native/firebase-config/ngx';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Zoom } from '@ionic-native/zoom/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgIdleModule } from '@ng-idle/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './features/shared/shared.module';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    SharedModule,
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireRemoteConfigModule,
    AppRoutingModule,
    HttpClientModule,
    NgIdleModule.forRoot(),
  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: { string: 'end_points' }, useValue: { enableAwesome: true } },
    {
      provide: {
        minimumFetchIntervalMillis: 3600000,
      },
      useFactory: () =>
        isDevMode() ? { minimumFetchIntervalMillis: 3600000 } : {},
    },
    CallNumber,
    FirebaseConfig,
    Keyboard,
    StatusBar,
    SplashScreen,
    Network,
    ScreenOrientation,
    Zoom,
    FirebaseDynamicLinks,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
