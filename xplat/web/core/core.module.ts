import { HttpClient,HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP } from '@ionic-native/http/ngx';
// libs
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// bring in custom web services here...

export function platformLangFactory() {
  //const browserLang = window.navigator.language || 'en'; // fallback English
  const browserLang = 'es'; // fallback Spanish

  // browser language has 2 codes, ex: 'en-US'
  return browserLang.split('-')[0];
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `./assets/i18n/`, '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [HTTP],
})
export class AppWorkspaceCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: AppWorkspaceCoreModule
  ) {
  }
}
