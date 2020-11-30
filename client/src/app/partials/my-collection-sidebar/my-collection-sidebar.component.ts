import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollectionDialogComponent } from '../../components/dialogs/collection-dialog/collection-dialog.component';

import { EventsService } from './../../services/events/events.service';
import { AuthService } from './../../services/auth/auth.service';
import { CollectionService } from './../../services/collections/collection.service';

import { SlugService } from './../../services/slug/slug.service';

@Component({
  selector: 'app-my-collection-sidebar',
  templateUrl: './my-collection-sidebar.component.html',
  styleUrls: ['./my-collection-sidebar.component.scss']
})
export class MyCollectionSidebarComponent implements OnInit {

  collections:any = [];
  user:any;

  constructor(
    public _dialog: MatDialog, 
    
    private _auth: AuthService,
    private _slug: SlugService,

    public _events: EventsService,
    private _collection: CollectionService
  ) {
  }

  ngOnInit(): void {
    this.getCollections();

    this._auth.authOutput.subscribe(() => {
      this.collections = [];
      this._collection.syncroniceCollections(this.collections);
    });
  }

  async getCollections(){
    let auth = await this._auth.hasLogin();

    if (auth) {
      let response:any = await this._collection.getCollections();
      this.collections = response.data;
      this.user = true;
      setTimeout(() => { this._collection.syncroniceCollections(this.collections); },400)
    }else{
      this.user = false;
    }

  }

  openDialogCollection()
  {
    let dialog = this._dialog.open(CollectionDialogComponent, {
    	data: {user:this.user}
    });

    dialog.afterClosed().subscribe(collection => {
      if (collection != undefined) {
        this.collections.push(collection);
        this._collection.syncroniceCollections(this.collections);
      }
    });
  }

  selectCollection(collection)
  {
    this._events.publish('openCollection',collection);
  }

  getSlug(slug:string){
    return this._slug.string_to_slug(slug);
  }

}
