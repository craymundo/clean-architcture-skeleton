import { APP_BASE_HREF, CommonModule } from '@angular/common';
import {
  Inject,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
// libs
import { TranslateService } from '@ngx-translate/core';

import { throwIfAlreadyLoaded } from '../utils/angular';

// app

//tokens
export const PlatformLanguageToken = new InjectionToken<string>(
  'PlatformLanguageToken'
);

@NgModule({
  imports: [CommonModule],
})
export class CoreModule {
  // configuredProviders: *required to configure WindowService and others per platform
  static forRoot(
    configuredProviders: Array<any>
  ): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
        ...configuredProviders,
      ],
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
      parentModule: CoreModule,
    @Inject(PlatformLanguageToken) lang: string,
      translate: TranslateService
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');

    // ensure default platform language is set
    translate.use(lang);
  }
}
