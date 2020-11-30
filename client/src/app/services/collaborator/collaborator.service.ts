import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { MasterService } from './../master.service';


@Injectable({
  providedIn: 'root'
})
export class CollaboratorService extends MasterService {

	baseUrl = environment.apiUrl;

  async getCollaborators(){
  	return await this._http.get(`${this.baseUrl}/collaborators`).toPromise();
  }

  async getCollaborator(slug){
  	return await this._http.get(`${this.baseUrl}/collaborators/${slug}`,await this.getOptions()).toPromise();
  }

  async follow(data){
  	return await this._http.post(`${this.baseUrl}/collaborators/follow`,data,await this.getOptions()).toPromise();
  }
}
