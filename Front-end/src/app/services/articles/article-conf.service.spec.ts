import { TestBed } from '@angular/core/testing';

import { ArticleConfService } from './article-conf.service';

describe('ArticleConfService', () => {
  let service: ArticleConfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleConfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
