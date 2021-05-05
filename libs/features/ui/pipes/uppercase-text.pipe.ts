import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseText',
  pure: true,
})
export class UppercaseTextPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return value[0].toUpperCase() + value.substr(1).toLowerCase();
    }
  }
}