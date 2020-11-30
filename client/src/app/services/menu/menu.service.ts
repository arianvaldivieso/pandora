import { Injectable, Output, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

	@Output() menuOutput: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  toggleMenu(data){
  	this.menuOutput.emit(data);
  }
}
