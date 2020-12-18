import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';


import { ClientService } from './../../services/client/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

	clients = [];

  data = [];

	displayedColumns: string[] = [
		'id',
		'cliente',
		'tiempo',
		'co2',
		'descuento',
    
	];

  constructor(
  	private _client:ClientService
 	) { }

  ngOnInit(): void {

  	this.getClients()
  }

  async getClients(){

  	let response:any = await this._client.getClients();

  	this.clients = response.data.clients;
    this.data = response.data.data;

  	//console.log(response)

  }

}
