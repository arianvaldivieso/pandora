import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CollectionService } from '../../../services/collections/collection.service';
import { EventsService } from '../../../services/events/events.service';

@Component({
  selector: 'app-collection-dialog',
  templateUrl: './collection-dialog.component.html',
  styleUrls: ['./collection-dialog.component.scss']
})
export class CollectionDialogComponent implements OnInit {

  collectionForm: FormGroup;
  user = this.data.user;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialogRef<CollectionDialogComponent>,
    public _collection: CollectionService, 
    public _events: EventsService
   ) { }

  ngOnInit(): void {
  	this.collectionForm = this.createColletionForm();
  }

  createColletionForm() {
	  return new FormGroup({
	  	title: new FormControl('', [Validators.required]),
	  });
	}

	get title() {
	  return this.collectionForm.get('title');
	}

  async onSubmit(title)
  {

    let response:any = await this._collection.store(title);

    this.dialog.close(response.data);

  }

}
