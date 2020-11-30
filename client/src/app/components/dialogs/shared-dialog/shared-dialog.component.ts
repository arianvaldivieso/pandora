import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-shared-dialog',
  templateUrl: './shared-dialog.component.html',
  styleUrls: ['./shared-dialog.component.scss']
})
export class SharedDialogComponent implements OnInit {

  article:any;
  tags:string = '';

  constructor(
  	public dialog: MatDialogRef<SharedDialogComponent>,
  	@Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
  	this.article = this.data.article;

  	this.tags = this.article.tags.map((t) => t.name).join(',');

  }

  onNoClick(): void {
    this.dialog.close();
  }

}
