import { ChartDataProvider } from './../../providers/chart-data/chart-data';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphPage } from './graph';

@NgModule({
  declarations: [
    GraphPage,
  ],
  imports: [
    IonicPageModule.forChild(GraphPage),
  ],
  providers: [
    ChartDataProvider
  ]
})
export class GraphPageModule {}
