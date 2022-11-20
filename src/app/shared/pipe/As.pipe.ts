import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to validate the type of the value
 */
@Pipe({
  name: 'as',
  pure: true,
})
export class AsPipe implements PipeTransform {

  transform<T>(value: any, _type: (new (...args: any[]) => T) | T): T {
    return value as T;
  }
}
