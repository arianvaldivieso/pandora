import { Component, NgModule, OnInit } from '@angular/core';

import { ArticleService } from './../../services/article/article.service';
import { AuthService } from './../../services/auth/auth.service';

import * as moment from 'moment';

@Component({
  selector: 'app-stast',
  templateUrl: './stast.component.html',
  styleUrls: ['./stast.component.scss']
})
export class StastComponent implements OnInit {

  area;


  selectedDate: {};

  config1 = {
    displayKey: "linea", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 3,
    searchPlaceholder: 'Buscar',
    placeholder: 'linea'
  };

  config2 = {
    displayKey: "cliente", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 3,
    searchPlaceholder: 'Buscar',
    placeholder: 'cliente'
  };

  lines = [];
  line:any = []

  clients = [];
  client:any = [];

  dateStart = ''
  dateEnd = '';

  linear;
  linear2;

  constructor(
    private _article:ArticleService,
    private _auth:AuthService
  ){

  }

  async ngOnInit(){
    let response:any = await this._article.getHistoryStash();
    

    this.getLines();

    this.getClients();
    this.filter();
  }

  async getLines(){
    let response:any = await this._article.getLines();
    this.lines = response.data;
  }

  async getClients(){

    let user:any = await this._auth.me();

    if (user.data.role == 'admin') {
      let response:any = await this._article.getClients();
      this.clients = response.data;
    }

    
  }

  onChangeDate(type,$event){

    let date = moment($event.value).format('YYYY-MM-DD');
    
    if (type == 'start') {
      this.dateStart = date;
    }else{
      this.dateEnd = date;
    }

    this.filter();

  }

  async filter(){
    let data = {
      start: this.dateStart,
      end: this.dateEnd,
      line: (this.line) ? this.line.linea : null,
      client: (this.client) ? this.client.cliente : null
    };


   let response:any = await this._article.filterStast(data);


   this.linear = [response.data.linear];
   this.linear2 = [response.data.linear2];
   this.area = response.data.area.map((item) => {

      if (item.name == '') {
        item.name = 'indefinido';
      }

      return item;

    }); 
  }

 
}
