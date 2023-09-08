import { Logger } from '@nestjs/common';
import * as Parser from 'rss-parser';

export class GoogleNewsService {
  private readonly logger = new Logger(GoogleNewsService.name);
  constructor() {}
  async searchInGoogleNews(mpName: string): Promise<any> {
    try {
      const startUrl = process.env.START_PART_URL_GOOGLE_NEWS;
      const endUrl = process.env.END_PART_URL_GOOGLE_NEWS;
      const parser = new Parser({
        timeout: 30000,
        maxRedirects: 5,
      });
      const query = `${startUrl}${encodeURI(mpName)}${endUrl}`;
      return await parser.parseURL(query);
    } catch (error) {
      this.logger.error(error);
      return undefined;
    }
  }

  async displayResults(query: string): Promise<any> {
    const results = await this.searchInGoogleNews(query);
    if (results) {
      const news = [];
      for (const item of results.items) {
        const newsItem = {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          contentSnippet: item.contentSnippet,
        };
        news.push(newsItem);
      }
      // sort news by date
      news.sort((a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });

      return news;
    }
    return undefined;
  }
}
