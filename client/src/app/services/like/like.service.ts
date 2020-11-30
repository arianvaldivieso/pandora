import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { MasterService } from './../master.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService extends MasterService {

  async toggleLike(data){
  	return await this._http.post(`${environment.apiUrl}/likes`,data,await this.getOptions()).toPromise();
  }
}
