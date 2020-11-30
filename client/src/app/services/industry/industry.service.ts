import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

import { MasterService } from './../master.service';

@Injectable({
  providedIn: 'root'
})
export class IndustryService extends MasterService {

  getInsdustries(){
  	return this._http.get(`${environment.apiUrl}/industries`);
  }
}
