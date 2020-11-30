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
    return this._http.get(`${this.baseUrl}/availability?page=${page}&${filters}`).toPromise();
  }

  async getHistory(filters,page = 1){

    filters = new URLSearchParams(filters).toString();
    return this._http.get(`${this.baseUrl}/history?page=${page}&${filters}`).toPromise();
  }

  async getReload(filters,page = 1){

    filters = new URLSearchParams(filters).toString();
    return this._http.get(`${this.baseUrl}/reload?page=${page}&${filters}`).toPromise();
  }

  async view(id){
    let data = {
      article_id: id
    };
    return this._http.post(`${this.baseUrl}/articles/view`,data,await this.getOptions()).toPromise();
  }
}
