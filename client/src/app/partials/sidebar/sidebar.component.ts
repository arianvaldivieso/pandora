import { Component, OnInit, Input } from '@angular/core';

import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from "@angular/router";
import { MenuService } from './../../services/menu/menu.service';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	@Input() active = false;
	@Input() user:any = {
    id:false,
    avatar :'https://electronicssoftware.net/wp-content/uploads/user.png'
  }


  constructor(
  	private _storage: StorageMap,
  	private _auth: AuthService,
  	private _router: Router,
  ) { }

  ngOnInit(): void {


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

    

    this._router.navigateByUrl("/login");

  }

  toggleMenu(){
    this.active = false;
  }

  

}
