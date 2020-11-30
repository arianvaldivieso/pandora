import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { MasterService } from './../master.service';



@Injectable({
  providedIn: 'root'
})
export class SubCategoryService extends MasterService {

  getSubCategories(){
  	return this._http.get(`${environment.apiUrl}/sub-categories`);
  }
}
