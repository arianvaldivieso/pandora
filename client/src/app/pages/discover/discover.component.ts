import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ActivatedRoute } from "@angular/router";

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { ArticleService } from './../../services/article/article.service';
import { AuthService } from './../../services/auth/auth.service';
import { CollectionService } from './../../services/collections/collection.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  articles:any = [];
  page:number = 1; 
  slug:any = false;
  collectionId:any = false;
  collaborator:any = false;;
  total = 0;

  collections = [];

  constructor(
    private _route: ActivatedRoute,
    private _article: ArticleService,
    private _auth: AuthService,
    private _collection: CollectionService,
    private _storage: StorageMap,
    private _snackBar: MatSnackBar,
  ) { }

  async ngOnInit() {
    this.getArticles();
  }

  async getArticles(){

    
    let response:any = await this._article.getArticles({},this.page);
    this.articles = response.data;
    this.total = response.total;
  }


  onChangePage($event){
    this.page = $event.page;
    this.getArticles();
  }

 
  changeTerm($event){
    this.articles = $event.data;
    this.total = $event.total;
    this.page = 1;
  }

}
