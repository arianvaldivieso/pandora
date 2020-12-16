import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnInit {

	@Input() data: any[];
  view: any[] = [700, 400];


  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  constructor() {
    //Object.assign(this, { single });
  }

  onSelect(data): void {
    //console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
  	console.log(this.data);
  }

}
