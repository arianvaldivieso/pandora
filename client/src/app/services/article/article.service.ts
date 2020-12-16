import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { MasterService } from './../master.service';


@Injectable({
  providedIn: 'root'
})
export class ArticleService extends MasterService {

  baseUrl = environment.apiUrl;

  async getArticles(filters,page = 1){

    filters = new URLSearchParams(filters).toString();
    return this._http.get(`${this.baseUrl}/availability?page=${page}&${filters}`,await this.getOptions()).toPromise();
  }

  async getHistory(filters,page = 1){

    filters = new URLSearchParams(filters).toString();
    return this._http.get(`${this.baseUrl}/history?page=${page}&${filters}`,await this.getOptions()).toPromise();
  }

  async getReload(filters,page = 1){

    filters = new URLSearchParams(filters).toString();
    return this._http.get(`${this.baseUrl}/reload?page=${page}&${filters}`,await this.getOptions()).toPromise();
  }

  async autocomplete(url){
    return this._http.get(url,await this.getOptions()).toPromise();
  }

  async getHistoryStash(){
    return this._http.get(`${this.baseUrl}/history/stast`,await this.getOptions()).toPromise();
  }

  async getLines(){
    return this._http.get(`${this.baseUrl}/lines`,await this.getOptions()).toPromise();
  }

  async getClients(){
    return this._http.get(`${this.baseUrl}/clients`,await this.getOptions()).toPromise();
  }

  async filterStast(filter){
    return this._http.post(`${this.baseUrl}/filter-stast`,filter,await this.getOptions()).toPromise();
  }

  async getArticlesReferences(){
    return this._http.get(`${this.baseUrl}/articles`,await this.getOptions()).toPromise();
  }

  async sendRequest(data:any){
    return this._http.post(`${this.baseUrl}/request`,data,await this.getOptions()).toPromise();
  }

  async view(id){
    let data = {
      article_id: id
    };
    return this._http.post(`${this.baseUrl}/articles/view`,data,await this.getOptions()).toPromise();
  }
}
