import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeWords',
  pure: true,
})

export class WordsCapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return value.replace(/(?:^|\s)\S/g, function(text_transform) { return text_transform.toUpperCase(); });
    }
  }
}