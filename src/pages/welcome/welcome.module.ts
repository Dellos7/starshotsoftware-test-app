import { PipesModule } from './../../pipes/pipes.module';
import { ConvertNumberToBinaryPipe } from './../../pipes/convert-number-to-binary/convert-number-to-binary';
import { IncreaseTextFontDirective } from './../../directives/increase-text-font/increase-text-font';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    WelcomePage
  ],
  imports: [
    DirectivesModule,
    PipesModule,
    IonicPageModule.forChild(WelcomePage)
  ],
})
export class WelcomePageModule {}
