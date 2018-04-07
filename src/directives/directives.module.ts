import { NgModule } from '@angular/core';
import { IncreaseTextFontDirective } from './increase-text-font/increase-text-font';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [IncreaseTextFontDirective],
	imports: [IonicModule],
	exports: [IncreaseTextFontDirective]
})
export class DirectivesModule {}
