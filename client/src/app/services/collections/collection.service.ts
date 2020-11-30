import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from './../../../environments/environment';
import { MasterService } from './../master.service';
@Injectable({
  providedIn: 'root'
})
export class CollectionService extends MasterService{

  baseUrl = environment.apiUrl;

  @Output() collectionsOutput: EventEmitter<boolean> = new EventEmitter();
  collections:any = [];

  async getCollections(){
    return await this._http.get(`${this.baseUrl}/collections`,await this.getOptions()).toPromise();
  }

  async store(data){
    return await this._http.post(`${this.baseUrl}/collections`,data,await this.getOptions()).toPromise();
  }


  async associateArticle(data){
    return await this._http.post(`${this.baseUrl}/collections/associate`,data,await this.getOptions()).toPromise();
  }

  syncroniceCollections(collections){
    console.info('syncronice collection');
    this.collections = collections;
    this.collectionsOutput.emit(this.collections);
  }
}
