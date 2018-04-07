import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the ChartDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartDataProvider {

  private graphMockData: any[] = [
    [ {name: "Comp A", employees: 3 }, {name: "Comp B", employees: 25 }, {name: "Comp C", employees: 13 }, {name: "Comp D", employees: 10 }, {name: "Comp E", employees: 30} ],
    [ {name: "Comp A", employees: 20 }, {name: "Comp B", employees: 5 }, {name: "Comp C", employees: 17 }, {name: "Comp D", employees: 80 }, {name: "Comp E", employees: 5} ],
    [ {name: "Comp A", employees: 5 }, {name: "Comp B", employees: 10 }, {name: "Comp C", employees: 10 }, {name: "Comp D", employees: 40 }, {name: "Comp E", employees: 0} ],
    []
  ];

  constructor() {}

  retrieveGraphData( timeout: number ) {
    return Observable.timer( 0, timeout )
    .map( () => {
      return this.getGraphMockDataRandom();
    });
  }

  private getGraphMockDataRandom(){
    let i = Math.floor(Math.random() * this.graphMockData.length);
    return this.graphMockData[i];
  }

}
