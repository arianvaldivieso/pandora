import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
  	public _storage: StorageMap,
  	public _http: HttpClient,
    private _notify: ToastrService
  ) { 

  }

  token:any;

  async getToken(){
    let token:any = await this._storage.get('pandora-token').toPromise();
    return token;
  }

	async setToken(){
    let token:any = await this._storage.get('pandora-token').toPromise();
    this.token = token;
  }

  async getOptions(){
    let token = await this.getToken();

    if (token == undefined) {
      return {};
    }

  	return  {
  		headers:{
        'Authorization': `Bearer ${token}` 
      }
  	}
  }
}
