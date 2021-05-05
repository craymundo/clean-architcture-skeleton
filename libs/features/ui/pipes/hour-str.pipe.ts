import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourStr',
  pure: true,
})
export class HourStrPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
        const hours = value.substring(0,2).toString();
        const minutes = value.substring(3,5).toString();
        const hoursInt = parseInt(hours);
        const ampm = hoursInt >= 12 ? ' p.m.' : ' a.m.';
        let strTime = '';
        
        if(hoursInt>=0 && hoursInt<=12){
            strTime = hours + ':' + minutes + ampm;
        }else{
            const hourCalc = (hoursInt - 12).toString().padStart(2, "0");
            strTime = hourCalc + ':' + minutes + ampm;
        }
        return strTime;
    }
  }
}