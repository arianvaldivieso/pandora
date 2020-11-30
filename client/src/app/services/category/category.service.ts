import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { MasterService } from './../master.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService extends MasterService {

  getCategories(){
  	return this._http.get(`${environment.apiUrl}/categories`);
  }
}
