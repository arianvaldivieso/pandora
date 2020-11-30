import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CollectionService } from '../../../services/collections/collection.service';
import { EventsService } from '../../../services/events/events.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-article-collection-dialog',
  templateUrl: './article-collection-dialog.component.html',
  styleUrls: ['./article-collection-dialog.component.scss']
})
export class ArticleCollectionDialogComponent implements OnInit {

  collectionForm: FormGroup;
  user = this.data.user;
  article:any = {};
  collections:any = [];

  constructor(
    
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialogRef<ArticleCollectionDialogComponent>,
    public _collections: CollectionService, 
    public events: EventsService,
  	private _snackBar: MatSnackBar,
   ) { }

  ngOnInit(): void {

    this.article = this.data.article;
    this.collections = this.data.collections;
    console.log(this.collections);
  	this.collectionForm = this.createColletionForm();
  }

  createColletionForm() {
	  return new FormGroup({
	  	collection_id: new FormControl('', [Validators.required]),
      article_id: new FormControl(this.article.id),
	  });
	}

	get collection_id() {
	  return this.collectionForm.get('collection_id').value;
	}

  async onSubmit()
  {
     
    let response:any = await this._collections.associateArticle({
      collection_id: this.collection_id,
      article_id: this.article.id
    });


    this._snackBar.open('item added to the collection', 'close', {
      duration: 3000,
      horizontalPosition:'end'
    });

    this.dialog.close(response.data);

    //this.dialog.closeAll();

  }

}
