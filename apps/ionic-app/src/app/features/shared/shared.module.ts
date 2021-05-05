import { NgModule } from '@angular/core';

// xplat
import { UIModule } from '@auna-workspace/ionic';

@NgModule({
  imports: [UIModule],
  exports: [UIModule],
})
export class SharedModule {}
