import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  ShapeOptions,
  LineProgressComponent,
  CircleProgressComponent,
  SemiCircleProgressComponent} from 'angular2-progressbar';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss']
})
export class CardDashboardComponent implements OnInit {

	@Input() data:any;

  @Output() dataFilter:any = new EventEmitter<string>();

	@Input() color:string;
  constructor() { }

  ngOnInit(): void {

  }


}
