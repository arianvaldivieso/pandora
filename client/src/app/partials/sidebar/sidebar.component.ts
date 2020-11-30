import { Component, OnInit } from '@angular/core';

import { MenuService } from './../../services/menu/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	hideMenu = true;

  constructor(
  	private _menu: MenuService
  ) { }

  ngOnInit(): void {

  	this._menu.menuOutput.subscribe(data => {
      this.hideMenu = data;
    });

  }

  

}
