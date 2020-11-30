import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

	@Input() presentationText:string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, id error ex harum suscipit quas!';
	@Input() presentationSubText:string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  constructor() { }

  ngOnInit(): void {
  }

}
