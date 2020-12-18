import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';

import { AuthService } from './../../services/auth/auth.service';
import { ClientService } from './../../services/client/client.service';
import { UserService } from './../../services/user/user.service';
import { ArticleService } from './../../services/article/article.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-premiun',
  templateUrl: './request-premiun.component.html',
  styleUrls: ['./request-premiun.component.scss']
})
export class RequestPremiunComponent implements OnInit {

  registerForm: FormGroup;
	loading = false;
	showError = false;
	validation_error = false;

  clients = [];

  config = {
    displayKey: "reference", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 10,
    searchPlaceholder: 'Buscar',
    placeholder: 'referencia'
  };

  references = [];
  reference:any = false;

  quantity;
  max:number;

  constructor(
  	private _storage: StorageMap,
  	private _auth: AuthService,
  	private _client: ClientService,
  	private _user: UserService,
  	private _article: ArticleService,
  	private _router: Router,
  	private _notify: ToastrService
  ) { }

  ngOnInit(): void {
  	this.getArticles();
  	//this.registerForm = this.createRegisterForm();
  }

	async getArticles(){

  	let response:any = await this._article.getArticlesReferences();

  	this.references = response.data;
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


	show = false;

	selectionChanged($event){
		this.show = true;
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

	async send(){
		let data:any = {
			reference: this.reference.reference,
			quantity: this.quantity
		}

		if (parseInt(this.quantity) > parseInt(this.reference.cantidad_stock)) {
			this._notify.error('La cantidad solicitada no puede superar la cantidad en stock');
		}else{
			if (data.reference != undefined && data.quantity != undefined) {
				data = await this._article.sendRequest(data);
				this._notify.success('Solicitud registrada');

				setTimeout(() => {
					this._router.navigateByUrl("/reload");
				},300)

				

			}else{
				this._notify.error('Compruebe los datos');
			}
		}

		

		
	}

}
