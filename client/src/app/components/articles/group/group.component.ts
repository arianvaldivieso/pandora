import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

	@Input() articles;
  @Input() term = '';
  @Input() collections = [];

	@Output() scroll = new EventEmitter<any>();

  constructor(
  ) { }

  ngOnInit(): void {

  }

  onScroll(){

  	this.scroll.emit({
  		scroll: true
  	})

  }

}
