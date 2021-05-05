import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayByDate',
  pure: true,
})
export class DateDayPipe implements PipeTransform {
  transform(value: string, type: string): string {
    if (value) {
      switch (type) {
        case 'day':
          return value.substring(8, 10);
        case 'month':
          const v_month = value.substring(5, 7).toString();
          switch (v_month) {
            case '01':
              return 'ENE.';
            case '02':
              return 'FEB.';
            case '03':
              return 'MAR.';
            case '04':
              return 'ABR.';
            case '05':
              return 'MAY.';
            case '06':
              return 'JUN.';
            case '07':
              return 'JUL.';
            case '08':
              return 'AGO.';
            case '09':
              return 'SEP.';
            case '10':
              return 'OCT.';
            case '11':
              return 'NOV.';
            case '12':
              return 'DIC.';
          }
        case 'mediumDate':
          const value_date = value.substring(0, 2);
          const value_month = value.substring(3, 5).toString();
          const value_year = value.substring(6, 10);

          switch (value_month) {
            case '01':
              return `${value_date } de` + ` enero ` + `de ${ value_year}`;
            case '02':
              return `${value_date } de` + ` febrero ` + `de ${ value_year}`;
            case '03':
              return `${value_date } de` + ` marzo ` + `de ${ value_year}`;
            case '04':
              return `${value_date } de` + ` abril ` + `de ${ value_year}`;
            case '05':
              return `${value_date } de` + ` mayo ` + `de ${ value_year}`;
            case '06':
              return `${value_date } de` + ` junio ` + `de ${ value_year}`;
            case '07':
              return `${value_date } de` + ` julio ` + `de ${ value_year}`;
            case '08':
              return `${value_date } de` + ` agosto ` + `de ${ value_year}`;
            case '09':
              return `${value_date } de` + ` setiembre ` + `de ${ value_year}`;
            case '10':
              return `${value_date } de` + ` octubre ` + `de ${ value_year}`;
            case '11':
              return `${value_date } de` + ` noviembre ` + `de ${ value_year}`;
            case '12':
              return `${value_date } de` + ` diciembre ` + `de ${ value_year}`;

          }
          case 'intermediateDate':
            const intermediate_date = value.substring(0, 2);
            const intermediate_month = value.substring(3, 5).toString();
            const intermediate_year = value.substring(6, 10);
  
            switch (intermediate_month) {
              case '01':
                return `${intermediate_date } de` + ` enero ` + `${ intermediate_year}`;
              case '02':
                return `${intermediate_date } de` + ` febrero ` + `${ intermediate_year}`;
              case '03':
                return `${intermediate_date } de` + ` marzo ` + `${ intermediate_year}`;
              case '04':
                return `${intermediate_date } de` + ` abril ` + `${ intermediate_year}`;
              case '05':
                return `${intermediate_date } de` + ` mayo ` + `${ intermediate_year}`;
              case '06':
                return `${intermediate_date } de` + ` junio ` + `${ intermediate_year}`;
              case '07':
                return `${intermediate_date } de` + ` julio ` + `${ intermediate_year}`;
              case '08':
                return `${intermediate_date } de` + ` agosto ` + `${ intermediate_year}`;
              case '09':
                return `${intermediate_date } de` + ` setiembre ` + `${ intermediate_year}`;
              case '10':
                return `${intermediate_date } de` + ` octubre ` + `${ intermediate_year}`;
              case '11':
                return `${intermediate_date } de` + ` noviembre ` + `${ intermediate_year}`;
              case '12':
                return `${intermediate_date } de` + ` diciembre ` + `${ intermediate_year}`;
  
            }
      }
    }
  }
}
