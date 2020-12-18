import { Injectable } from '@angular/core';


import { environment } from './../../../environments/environment';
import { MasterService } from './../master.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends MasterService{

 	baseUrl = environment.apiUrl;

	async getUsers(){
    return this._http.get(`${this.baseUrl}/users`,await this.getOptions()).toPromise();
  }

  async store(data){
    return this._http.post(this.baseUrl+'/users',data,await this.getOptions()).toPromise();
  }

  async deleteUser(data){
  	data = {
  		id:data
  	}
    return this._http.post(this.baseUrl+'/users/delete',data,await this.getOptions()).toPromise();
  }
}
