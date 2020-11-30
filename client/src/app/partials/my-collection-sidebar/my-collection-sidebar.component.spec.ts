import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCollectionSidebarComponent } from './my-collection-sidebar.component';

describe('MyCollectionSidebarComponent', () => {
  let component: MyCollectionSidebarComponent;
  let fixture: ComponentFixture<MyCollectionSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCollectionSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCollectionSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
