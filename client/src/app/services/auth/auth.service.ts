import { Injectable, Output, EventEmitter } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { environment } from './../../../environments/environment';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token:any;
  private _login:boolean;

  @Output() authOutput: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private _storage: StorageMap,
    private _http: HttpClient
   ) { 
    this.getToken();
  }

  setSession(response): void {
    this._token = response.data.token.accessToken;
    this._login = true;
    this._storage.set('pandora-token',this._token).subscribe(() => {});
    this._storage.set('pandora-login',true).subscribe(() => {});
  }

 	async hasLogin(){
    return await this._storage.has('pandora-token').toPromise();
  }

  login(data){
    return this._http.post(environment.apiUrl+'/auth/login',data);
  }

  logout(){
    return this._http.post(environment.apiUrl+'/auth/logout',{});
  }

  async getToken(){
    let token:any = await this._storage.get('pandora-token').toPromise();
    this._token = token;
    return this._token;
  }

  async me() {

    let token:any = await this._storage.get('pandora-token').toPromise();

    return await this._http.get(environment.apiUrl+'/auth/users/me',{
      headers:{
        'Authorization': `Bearer ${token}` 
      }
    }).toPromise();

  }

  get token() {

    this._storage.get('wizer-token').subscribe((response) => {
      this._token = response;
    });

    return this._token;
  }

  syncroniceAuth(){
    console.info('logout');
    this.authOutput.emit();
  }

}
