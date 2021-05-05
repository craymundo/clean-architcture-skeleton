import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DateOrderPipe, UppercaseTextPipe, DateDayPipe, WordsCapitalizePipe, HourStrPipe, FormatPhoneTextPipe } from './pipes';


@NgModule({
  imports: [TranslateModule],
  declarations: [DateOrderPipe, UppercaseTextPipe, DateDayPipe, WordsCapitalizePipe, HourStrPipe, FormatPhoneTextPipe],
  exports: [TranslateModule, DateOrderPipe, UppercaseTextPipe, DateDayPipe, WordsCapitalizePipe, HourStrPipe, FormatPhoneTextPipe],
})
export class UISharedModule {}
