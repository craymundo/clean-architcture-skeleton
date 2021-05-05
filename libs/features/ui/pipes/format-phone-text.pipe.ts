import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhoneText',
  pure: true,
})
export class FormatPhoneTextPipe implements PipeTransform {
  transform(value) {
    if (!value) { return ''; }

        var value = value.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return value;
        }

        var country, city, number;

        let cellnumber: string  = value;
        let cellinit: number = 0;

        cellinit = parseInt( cellnumber.substring(0,1));

        if( cellinit > 2)
        {
            cellnumber = cellnumber.substring(0, 3) + ' ' + cellnumber.substring(3,6) + ' ' + cellnumber.substring(6,9);
            return cellnumber;
        }

        switch (value.length) {
            // case 9: // +1PPP####### -> C (PP) ###-####
            //     country = 1;
            //     city = value.slice(0, 2);
            //     number = value.slice(2);
            //     break;
            case 9: 
                country = 1;
                if( value.slice(0, 2)=='01'){
                    city = value.slice(0, 2);
                    number = value.slice(2);
                }else{
                    city = value.slice(0, 3);
                    number = value.slice(3);
                }
                
                break;

            case 10: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 3);
                number = value.slice(3);
                break;

            case 11: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 4);
                number = value.slice(4);
                break;

            default:
                return value;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
  }
}