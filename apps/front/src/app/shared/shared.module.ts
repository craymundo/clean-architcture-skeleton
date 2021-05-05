import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    NotfoundComponent,
  ],
  imports: [
    CommonModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {}
