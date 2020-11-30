import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCollectionDialogComponent } from './article-collection-dialog.component';

describe('ArticleCollectionDialogComponent', () => {
  let component: ArticleCollectionDialogComponent;
  let fixture: ComponentFixture<ArticleCollectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCollectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCollectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
