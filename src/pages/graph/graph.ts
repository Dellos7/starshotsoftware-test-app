import { ChartDataProvider } from './../../providers/chart-data/chart-data';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { ISubscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

/**
 * Generated class for the GraphPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const DEFAULT_REFRESH_TIMEOUT_SECONDS: number = 10;
const CHART_HOVER_BACKGROUND_COLOR_ALPHA: number = 0.65;

@IonicPage()
@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html',
})
export class GraphPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  refreshTimeoutSeconds: number = DEFAULT_REFRESH_TIMEOUT_SECONDS;

  private observableSubs: ISubscription;

  graphState: any;

  chartDataLog: any;

  timeToRefreshInterval: any;
  timeToRefresh: number;

  form: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private chartSvc: ChartDataProvider, public formBuilder: FormBuilder) {
    this.graphState = {
      type: 'doughnut',
      data: {}
    };
    this.addInputValidation();
  }

  ionViewDidLoad() {
    //Don't use it because it already fires with (ngModelChange) of timeout
    //this.updateGraph(this.refreshTimeoutSeconds);
  }

  addInputValidation() { 
    this.form = this.formBuilder.group({
      timeout: ['', Validators.compose([Validators.required, Validators.pattern('^\\d+$'), Validators.min(1)])]
    });
  }

  /**
   * Modifies timeToRefresh attr each second in order to simulate the countdown
   */
  setTimeToRefreshInterval(refreshTimeoutSeconds: number) {
    this.timeToRefresh = refreshTimeoutSeconds;
    this.timeToRefreshInterval = setInterval(() => {
      this.timeToRefresh--;
      if (this.timeToRefresh === 0) {
        this.timeToRefresh = refreshTimeoutSeconds;
      }
    }, 1000);
  }

  /**
   * Fires at every refresh in the refreshTimeoutSeconds input
   * Triggers the update of the chart observable timeout
   */
  refreshTimeoutSecondsChange(ev) {
    let refreshTimeout = ev;
    if (refreshTimeout) {
      if (this.observableSubs) {
        this.observableSubs.unsubscribe();
      }
      clearInterval(this.timeToRefreshInterval);
      this.setTimeToRefreshInterval(refreshTimeout);
      this.updateGraph(refreshTimeout);
    }
    else {//If the let the input empty, stop updating the chart
      this.observableSubs.unsubscribe();
      clearInterval(this.timeToRefreshInterval);
    }
  }

  updateGraph(refreshTimeout: number) {

    //Subscribe to the service observable which will trigger data each refreshTimeout seconds
    this.observableSubs = this.chartSvc.retrieveGraphData(refreshTimeout * 1000).subscribe((res) => {
      //Parse data to string in order to show in the view
      this.chartDataLog = JSON.stringify(res);
      //Get the data and labels from the svc separated
      let [data, labels] = this.getGraphDataAndLabels(res);
      //Generate random graph colors
      let graphColors = this.getRandomGraphColors(data.length);
      this.graphState.data['datasets'] = [{
        data,
        //Background random colors of the graph
        backgroundColor: this.getGraphBackgroundColorsStrArr(graphColors),
        //Background random colors of the graph when hovering
        hoverBackgroundColor: this.getGraphHoverBackgroundColorsStrArr(graphColors, CHART_HOVER_BACKGROUND_COLOR_ALPHA)
      }];
      this.graphState.data['labels'] = labels;

      //Modify tooltips in chart (show data and percentaje)
      this.graphState.options = {};
      this.graphState.options['tooltips'] = {
        callbacks: {
          label: this.showDataAndPercentajeTooltip
        }
      };

      //Create the chart only the 1st time
      if (!this.doughnutChart) {
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, this.graphState);
      }
      //If chart is already created, update the data and labels
      else {
        this.doughnutChart.data.datasets.forEach((_dataset) => {
          _dataset = data;
        });
        this.doughnutChart.data.labels.forEach((_labels) => {
          _labels = labels;
        });
        this.doughnutChart.update();
      }
    });
  }

  /**
   * Callback of chart.js tooltips that allows to modify the tooltip when hovering the chart
   * It shows the data and the percentaje
   */
  showDataAndPercentajeTooltip(tooltipItem, data) {
    let dataset = data.datasets[tooltipItem.datasetIndex];
    let datasetDataSum = dataset.data.reduce((total, currentValue, currentIndex, array) => {
      return total + currentValue;
    });
    let currentValue = dataset.data[tooltipItem.index];
    let percentaje = ((currentValue / datasetDataSum) * 100).toFixed(2);
    return `${currentValue} (${percentaje}%)`;
  }

  /**
   * Generates n random colors
   */
  getRandomGraphColors(n: number) {
    var colors: RGBA[] = [];
    var dynamicColors = function () {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return new RGBA(r, g, b);
    };

    for (let i = 0; i < n; i++) {
      colors.push(dynamicColors());
    }
    return colors;
  }

  /**
   * Generates an array of colors in "rgb(r, g, b)" string format
   */
  getGraphBackgroundColorsStrArr(colors: RGBA[]) {
    return colors.map(color => color.getCssRgb());
  }

  /**
   * Generates an array of colors in "rgba(r, g, b, a)" string format
   */
  getGraphHoverBackgroundColorsStrArr(colors: RGBA[], alpha: number) {
    return colors.map(color => {
      color.a = alpha;
      return color.getCssRgba();
    });
  }

  /**
   * Separates the data received from the service in labels and data itself
   */
  getGraphDataAndLabels(svcDataRes: any) {
    let data = [];
    let labels = [];
    for (let item of svcDataRes) {
      labels.push(item.name);
      data.push(item.employees);
    }
    return [data, labels]
  }

}

class RGBA {

  r: number;
  g: number;
  b: number;
  a: number;

  constructor(r: number, g: number, b: number, a?: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  getCssRgb() {
    return `rgb( ${this.r}, ${this.g}, ${this.b})`;
  }

  getCssRgba() {
    return `rgba( ${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

}
