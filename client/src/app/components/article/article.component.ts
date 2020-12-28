import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageMap } from '@ngx-pwa/local-storage';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { LikeService } from './../../services/like/like.service';
import { AuthService } from './../../services/auth/auth.service';
import { ArticleService } from './../../services/article/article.service';
import { CollectionService } from './../../services/collections/collection.service';

import { SharedDialogComponent } from './../dialogs/shared-dialog/shared-dialog.component';
import { ArticleDialogComponent } from './../dialogs/article-dialog/article-dialog.component';
import { ArticleCollectionDialogComponent } from './../dialogs/article-collection-dialog/article-collection-dialog.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

	@Input() article;
  @Input() collections;
  @Input() user;
  @Input() date = true;
  @Input() dialog:boolean = false;

  views = [];
 
  constructor(
    private _auth: AuthService,
  	private _storage: StorageMap,
  	private _like: LikeService,
    private _article: ArticleService,
    private _collection: CollectionService,

  	private _snackBar: MatSnackBar,
    public _dialog: MatDialog

  ) { }

  ngOnInit(): void {

    this._storage.get('wizer-views').subscribe((response:any) => {
      if (response != undefined) {
        this.views = response;
      }
      
    });

  }

  async toggleLike(){

    let auth = await this._auth.hasLogin();
    
    if (auth) {
      
      let data = {
        article_id:this.article.id
      }

      let response:any = await this._like.toggleLike(data);
      this.article = response.data;

    }else{
      this._snackBar.open('You must be logged in', 'close', {
        duration: 2000,
        horizontalPosition:'end'
      });
    }

  }

  openDialog() {
    if (!this.dialog) {
      this._dialog.open(SharedDialogComponent, {
        data: {
          article: this.article
        }
      });
    }
    
  }

  async openArticle(){

    let auth = await this._auth.hasLogin();
    
    if (auth && !this.article.views.length) {
      let response:any = await this._article.view(this.article.id);
      this.article = response.data;
    }else{
      let views = this._storage.get('wizer-views').subscribe((response:any) => {

        if (response == undefined) {
          this._storage.set('wizer-views',[this.article.id]).subscribe((response) => {});
        }else{

          let i = response.indexOf(this.article.id);
          if (i === -1) {
            response.push(this.article.id);
            this._storage.set('wizer-views',response).subscribe((response) => {});
          }
          
        }

        this.views = response;
      })

    }

    window.open(this.article.url, "_blank"); 
  }

  viewMore(){
    let dialog = this._dialog.open(ArticleDialogComponent, {
      data: {
        article: this.article
      }
    });
  }

  pocket(){

    let dialog = this._dialog.open(ArticleCollectionDialogComponent, {
      data: {
        article: this.article,
        collections: this.collections
      }
    });

    dialog.afterClosed().subscribe(article => {
      if (article != undefined) {
        this.article = article;
      }
    });

    
  }


}
