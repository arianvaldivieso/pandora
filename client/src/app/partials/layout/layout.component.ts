import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { StorageMap } from '@ngx-pwa/local-storage';
import { AuthService } from './../../services/auth/auth.service';


import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public route: string = "";
  public login:any = false;
  public user:any = {
    id:false,
    avatar :'https://electronicssoftware.net/wp-content/uploads/user.png'
  }

  sidebarActive = false;
  t = false;
  constructor(
    _location: Location,
    private _router: Router,
    public _auth: AuthService,
    private _storage: StorageMap,
    private _snackBar: MatSnackBar,
  ) {
    
  
    //this.hasLogin();

    let tempUrl = window.location.href.split('/');

    this.route = tempUrl.pop();

  }

  ngOnInit(): void {

    this.hasLogin();

  }

  async hasLogin(){

    let login = await this._auth.hasLogin();
    if (login) {
      let response:any = await this._auth.me();
      this.t = true;
      this.user = response.data;
      this.user.avatar = (this.user.avatar) ? this.user.avatar : 'http://www.colsein.com.co/pandora/assets/images/user.png';
    }else{
      this._router.navigateByUrl("/login");
    }
  
  }


  logout(){

    this._storage.delete('pandora-login').subscribe(() => {});
    this._storage.delete('pandora-token').subscribe(() => {});
    this._storage.delete('pandora-views').subscribe(() => {});
    this.user = {
      id:false,
      avatar :null
    }


    this._auth.syncroniceAuth();

    this._snackBar.open('Coming out', 'close', {
      duration: 2000,
      horizontalPosition:'end'
    });

    this._router.navigateByUrl("/login");

  }

  toggleSidebar(){
    this.sidebarActive = !this.sidebarActive;
  }

}
