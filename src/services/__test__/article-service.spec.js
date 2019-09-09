import ArticleService from '../article-service';
import BaseService from '../base-service';

describe('ArticleService Integration', () => {
  it('should extend BaseService', () => {
    expect(ArticleService).toBeInstanceOf(BaseService);
  });
});
