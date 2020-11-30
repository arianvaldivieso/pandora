import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { UserService } from './../../services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	users = [];

	displayedColumns: string[] = [
		'id',
		'name',
		'email',
		'client',
		'role'
	];

  constructor(
  	private _user: UserService
  ) { }

  ngOnInit(): void {

  	this.getUsers()
  }

  async getUsers(){

  	let response:any = await this._user.getUsers();

  	this.users = response.data;
  }

  

}
