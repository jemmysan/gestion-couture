import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleConfectionComponent } from './article-confection.component';

describe('ArticleConfectionComponent', () => {
  let component: ArticleConfectionComponent;
  let fixture: ComponentFixture<ArticleConfectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleConfectionComponent]
    });
    fixture = TestBed.createComponent(ArticleConfectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
