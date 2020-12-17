import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from './../../services/auth/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	loading = false;
	showError = false;

  constructor(
  	private _notify: ToastrService,
  	private _storage: StorageMap,
  	private _auth: AuthService,
  	private _router: Router,
  ) { }

  ngOnInit(): void {
  	this.loginForm = this.createLoginForm();
  }

  createLoginForm() {
	  return new FormGroup({
	    email: new FormControl('',[Validators.required, Validators.email]),
	    password: new FormControl('',[Validators.required]),
	  });
	}


	get email() {
	  return this.loginForm.get('email');
	}

	get password() {
	  return this.loginForm.get('password');
	}

	revert() {
	  this.loginForm.reset();
	}

	onSubmit() {
	  let data = {

	  	email: this.email.value,
	  	password: this.password.value

	  };

	  this._auth.login(data).subscribe((response:any) => {
	  	if (response.success) {
	  		this._auth.setSession(response);
	  		this._router.navigateByUrl("/");
	  	}else{
	  		this._notify.error('Credenciales invalidas');
	  	}
	  });

	}


}
