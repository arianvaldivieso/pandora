import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { MasterService } from './../master.service';


@Injectable({
  providedIn: 'root'
})
export class TypeService extends MasterService {

  getTypes(){
  	return this._http.get(`${environment.apiUrl}/types`);
  }
}
