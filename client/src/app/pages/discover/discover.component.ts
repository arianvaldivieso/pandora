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
  page:number = 0; 
  slug:any = false;
  collectionId:any = false;
  collaborator:any = false;;

  private filters:any = {};
  collaborators:any;

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

    this.slug = this._route.snapshot.paramMap.get("slug");
    if (this.slug != null) {
      this.slug = this.slug.split('-');

      let collectionId = this.slug.shift();

      console.log(collectionId);

      this.filters =  {
        collection: this.slug.shift()
      }
      
      this.slug = this.slug.join(' ');
      console.log(this.slug,this.collections);
    }else{
      this.slug = false;
    }
    

    this.onScroll();

    this._auth.authOutput.subscribe(() => {
      this.page = 0;
      this.articles = [];
      this.collections = [];
      this.onScroll();
    });

    this._collection.collectionsOutput.subscribe(collections => {
      this.collections = collections;
    });

  }

  async getArticles(){

    if (this.page != 1) {
      this._snackBar.open('Loading more', 'close', {
        duration: 2000,
        horizontalPosition:'end'
      });
    }
    
    let response:any = await this._article.getArticles(this.filters,this.page);
    this.articles = this.articles.concat(response.data);
  }


  onScroll(){
    this.page += 1;
    this.getArticles();
  }

  searchArticles($event){
    this.page = 0;
    this.filters = JSON.parse(JSON.stringify($event));
    this.articles = [];
    this.onScroll();
  }

  setCollaborators($event){
    this.collaborators = $event.collaborators;
  }

  showCollaborador($event){
    this.collaborator = $event;
  }

}
