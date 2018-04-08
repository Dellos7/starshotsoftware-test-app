import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Config } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//Whether to retrieve the data from the local db (storage) or use mock data
const USE_LOCAL_DB: boolean = true;

/*
  Generated class for the ChartDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartDataProvider {

  //Mock data
  private _chartData: any[] = [
    [{ name: "Comp A", employees: 3 }, { name: "Comp B", employees: 25 }, { name: "Comp C", employees: 13 }, { name: "Comp D", employees: 10 }, { name: "Comp E", employees: 30 }],
    [{ name: "Comp A", employees: 20 }, { name: "Comp B", employees: 5 }, { name: "Comp C", employees: 17 }, { name: "Comp D", employees: 80 }, { name: "Comp E", employees: 5 }],
    [{ name: "Comp A", employees: 5 }, { name: "Comp B", employees: 10 }, { name: "Comp C", employees: 10 }, { name: "Comp D", employees: 40 }, { name: "Comp E", employees: 0 }],
    []
  ];
  /*private _chartData: any[] = [
    
  ];*/

  private chartData: any[] = [];

  constructor(private storage: Storage) { }

  refreshData() {
    var self = this;
    return new Promise((resolve, reject) => {
      //We want to use storage instead of mock
      if (USE_LOCAL_DB) {
        self.storage.get('chart_data')
          .then((checkVal) => {
            if (!checkVal) {
              //First time we retrieve data from storage, we set up the data in the storage
              self.storage.set('chart_data', self._chartData).then(
                (val) => {
                  //Update the data in the service from the storage
                  self.chartData = val;
                  resolve();
                }
              );
            }
            else {
              //Update the data in the service from the storage
              self.storage.get('chart_data')
                .then((val) => {
                  self.chartData = val;
                  resolve();
                });
            }
          });
      }
      //We use the mock data
      else {
        self.chartData = self._chartData;
        resolve();
      }
    });
  }

  retrieveGraphData(timeout: number) {
    var self = this;
    return Observable.timer(0, timeout)
      .flatMap(() => {
        return Observable.fromPromise(self.refreshData())
          .map(() => {
            return self.getGraphDataRandom();
          });
      });
  }

  private getGraphDataRandom() {
    let i = Math.floor(Math.random() * this.chartData.length);
    return this.chartData[i];
  }
  
}
