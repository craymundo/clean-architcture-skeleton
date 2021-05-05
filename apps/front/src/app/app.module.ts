import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireRemoteConfigModule } from '@angular/fire/remote-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { firebaseConfig } from '@app-workspace/core';

import { FirebaseConfig } from '@ionic-native/firebase-config/ngx';
import { NgIdleModule } from '@ng-idle/core';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { NotfoundComponent } from './shared/not-found/not-found.component';
import { UserRepository } from '../../../../libs/core/src/domain/repository/UserRepository';
import { InjectorModule } from '../../../../libs/core/src/injector/injector.module';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    InjectorModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireRemoteConfigModule,
    NgIdleModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadChildren: () =>
          import('./feature/login/login.module').then(
            (m) => m.LoginModule
          )
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./feature/home/home.module').then(
            (m) => m.HomeModule
          )
      },
      { path: '**', component: NotfoundComponent }
    ]),
    SharedModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [
    {
      provide: {
        minimumFetchIntervalMillis: 3600000,
      },
      useFactory: () =>
        isDevMode() ? { minimumFetchIntervalMillis: 3600000 } : {},
    },
    FirebaseConfig,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
