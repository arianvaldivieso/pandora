import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { CollaboratorService } from './../../services/collaborator/collaborator.service';
import { ArticleService } from './../../services/article/article.service';
import { AuthService } from './../../services/auth/auth.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-collaborator-detail',
  templateUrl: './collaborator-detail.component.html',
  styleUrls: ['./collaborator-detail.component.scss']
})
export class CollaboratorDetailComponent implements OnInit {

	slug:string;
	collaborator:any;
  articles:any = [];
  page = 0;

  constructor(
  	private _route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _auth: AuthService,

  	private _collaborator: CollaboratorService,
    private _article: ArticleService
  ) { }

  ngOnInit(): void {

  	 this.slug = this._route.snapshot.paramMap.get("slug");
  	 this.getCollagorator();

  }

  async getCollagorator(){

  	let response:any = await this._collaborator.getCollaborator(this.slug);
  	this.collaborator = response.data;
    this.onScroll();

  }

  async getArticles(){

    if (this.page != 1) {
      this._snackBar.open('Loading more', 'close', {
        duration: 2000,
        horizontalPosition:'end'
      });
    }
    
    let response:any = await this._article.getArticles({
      collaborator_id:this.collaborator.id
    },this.page);

    this.articles = this.articles.concat(response.data);
  }

  onScroll(){
    this.page += 1;
    this.getArticles();
  }

  async follow()
  {

    let auth = await this._auth.hasLogin();
    
    if (auth) {

      let response:any = await this._collaborator.follow({
        collaborator_id: this.collaborator.id
      });

      this.collaborator = response.data;

      /**
      .subscribe((response:any)=>{
        this.colaborador = response.data;
        let idx = this.collaborators.findIndex(x=>x.id == this.colaborador.id);
        this.collaborators.splice(idx,1,this.colaborador);
      })

      

      
      let data = {
        article_id:this.article.id
      }

      let response:any = await this._like.toggleLike(data);
      this.article = response.data;
  
      **/

    }else{
      this._snackBar.open('You must be logged in', 'close', {
        duration: 2000,
        horizontalPosition:'end'
      });
    }

    
  }



}
