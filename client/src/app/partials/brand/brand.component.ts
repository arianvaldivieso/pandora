import { Component, OnInit, Input } from '@angular/core';

import { MenuService } from './../../services//menu/menu.service';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

	@Input() minimal = false;
	hideMenu: boolean = true;

  constructor(
    private _menu: MenuService
  ) { }

  ngOnInit(): void {
  }


  toggleMenu(){
    this.hideMenu = !this.hideMenu;
    this._menu.toggleMenu(this.hideMenu);
  }



}
