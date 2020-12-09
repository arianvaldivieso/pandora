import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';

import { AuthService } from './../../services/auth/auth.service';
import { ClientService } from './../../services/client/client.service';
import { UserService } from './../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
	loading = false;
	showError = false;
	validation_error = false;

  clients = [];

  constructor(
  	private _storage: StorageMap,
  	private _auth: AuthService,
  	private _client: ClientService,
  	private _user: UserService,
  	private _router: Router
  ) { }

  ngOnInit(): void {
  	this.getClients();
  	this.registerForm = this.createRegisterForm();
  }

	async getClients(){

  	let response:any = await this._client.getClients();

  	this.clients = response.clients;
	}

  createRegisterForm() {
	  return new FormGroup({
	  	name: new FormControl('', [Validators.required]),
	    email: new FormControl('',[Validators.required, Validators.email]),
	    password: new FormControl('',[Validators.required]),
	    client_id: new FormControl('',[Validators.required])
	  });
	}

	get email() {
	  return this.registerForm.get('email');
	}

	get password() {
	  return this.registerForm.get('password');
	}

	get name() {
	  return this.registerForm.get('name');
	}

	get client_id() {
	  return this.registerForm.get('client_id');
	}

	revert() {
	  this.registerForm.reset();
	}

	async onSubmit() {
	  let data = {

	  	email: this.email.value,
	  	password: this.password.value,
	  	name: this.name.value,
	  	client_id: this.client_id.value

	  };

	  let response:any = await this._user.store(data);

	  console.log(response);

	  this._router.navigateByUrl("/users");


	}

}
