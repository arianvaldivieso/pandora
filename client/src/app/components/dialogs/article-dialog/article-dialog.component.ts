import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.scss']
})
export class ArticleDialogComponent implements OnInit {

	article:any;
	tags = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
  	this.article = this.data.article;
  	this.tags = this.article.tags.map((t) => t.name).join(',');
  	console.log(this.article);
  }

}
