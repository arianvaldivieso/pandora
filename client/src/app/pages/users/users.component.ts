import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { UserService } from './../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';


import { ConfirmDeleteUserComponent } from './../../dialogs/confirm-delete-user/confirm-delete-user.component';

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
		'role',
    'delete'
	];

  constructor(
  	private _user: UserService,
    public dialog: MatDialog,
    private _notify: ToastrService
  ) { }

  ngOnInit(): void {

  	this.getUsers()
  }

  async getUsers(){

  	let response:any = await this._user.getUsers();

  	this.users = response.data;
  }

  deleteUser(userId){

    const dialogRef = this.dialog.open(ConfirmDeleteUserComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      
      if (result) {
        let response:any = await this._user.deleteUser(userId);

        this._notify.success('Usuario eliminado con exito');
        setTimeout(() => {
          location.reload();
        },300)
        
      }
    });
  }


  

}
