import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPremiunComponent } from './request-premiun.component';

describe('RequestPremiunComponent', () => {
  let component: RequestPremiunComponent;
  let fixture: ComponentFixture<RequestPremiunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPremiunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPremiunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
