import { Component, OnInit, NgModule, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';


var multi = [
  {
    "name": "Valor en compras",
    "series": [
      {
        "name": "09-2020",
        "value": 62000000
      },
      {
        "name": "10-2020",
        "value": 73000000
      },
      {
        "name": "11-2020",
        "value": 89400000
      }
    ]
  },


];

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.scss']
})
export class LinearChartComponent implements OnInit {

  multi: any[];
  view: any[] = [0, 300];
  @Input() data = [];
  @Input() title = '';

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Valor en compras y cantidad de transacciones';
  yAxisLabel: string = '';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25']
  };

  constructor() {
    //Object.assign(this, { multi });
  }

  ngOnInit(): void {
    this.multi = this.data;
  }

  onSelect(data): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
