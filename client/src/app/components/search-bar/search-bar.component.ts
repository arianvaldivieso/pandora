import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { environment } from './../../../environments/environment';

import { ArticleService } from './../../services/article/article.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: any = [];
  apiUrl = '';
  term = '';
  @Input() key = '';


  @Output() itemOutput = new EventEmitter<any>();

  constructor(
    private _article:ArticleService
  ){}

  ngOnInit() {
    

    this.apiUrl = `${environment.apiUrl}/${this.key}/autocomplete`;
  }

  private async _filter(value: string) {
    const filterValue = value.toLowerCase();

    

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  async onKey($event){

    let response:any = await this._article.autocomplete(`${this.apiUrl}?keyword=${$event.target.value}`);
    this.filteredOptions = response.data;

    this.itemOutput.emit(response)


  }


}
