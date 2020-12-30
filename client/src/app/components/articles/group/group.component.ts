import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

	@Input() articles;
  @Input() term = '';
  @Input() page = 1;
  @Input() total = 0;
  @Input() collections = [];
  @Input() itemsPerPage = 6;

	@Output() pagination = new EventEmitter<any>();

  constructor(
  ) { }

  ngOnInit(): void {

  }

  onScroll(){


  }

  onChangePage($event){
    this.page = $event;
    this.pagination.emit({
      page: $event
    })
  }

}
