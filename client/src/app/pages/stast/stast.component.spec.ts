import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StastComponent } from './stast.component';

describe('StastComponent', () => {
  let component: StastComponent;
  let fixture: ComponentFixture<StastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
