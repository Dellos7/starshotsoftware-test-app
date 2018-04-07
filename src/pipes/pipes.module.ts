import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { ConvertNumberToBinaryPipe } from './convert-number-to-binary/convert-number-to-binary';
@NgModule({
	declarations: [ConvertNumberToBinaryPipe],
	imports: [IonicModule],
	exports: [ConvertNumberToBinaryPipe]
})
export class PipesModule {}
