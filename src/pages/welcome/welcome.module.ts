import { ConvertNumberToBinaryPipe } from './../../pipes/convert-number-to-binary/convert-number-to-binary';
import { IncreaseTextFontDirective } from './../../directives/increase-text-font/increase-text-font';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';

@NgModule({
  declarations: [
    WelcomePage,
    IncreaseTextFontDirective,
    ConvertNumberToBinaryPipe
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
  ],
})
export class WelcomePageModule {}
