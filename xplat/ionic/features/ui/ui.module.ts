import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { KeyboardService } from './services/keyboard.service';

@NgModule({
  imports: [ IonicModule],
  declarations: [],
  providers: [KeyboardService],
  exports: [
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UIModule {}
