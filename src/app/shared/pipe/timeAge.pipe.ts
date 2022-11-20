import { Pipe, PipeTransform } from '@angular/core';
import moment                  from 'moment';

/**
 * Pipe to format date to time ago format
 */
@Pipe({name: 'timeAge'})
export class TimeAgePipe implements PipeTransform {
  transform(date: Date): string {
    return moment(date).fromNow();
  }
}
