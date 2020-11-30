import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { MasterService } from './../master.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends MasterService {

	baseUrl = environment.apiUrl;

	async getClients(){
    return this._http.get(`${this.baseUrl}/clients`,await this.getOptions()).toPromise();
  }

}
