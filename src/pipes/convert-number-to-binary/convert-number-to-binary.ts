import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ConvertNumberToBinaryPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'convertNumberToBinary',
})
export class ConvertNumberToBinaryPipe implements PipeTransform {
  /**
   * Takes a value and converts it to binary.
   */
  transform(value: number, ...args) {
    return value.toString(2);
  }
}
