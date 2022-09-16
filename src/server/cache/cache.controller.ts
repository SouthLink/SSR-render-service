import { Controller, Get } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private cacheService: CacheService) {}

  /**
   * @description clean service cache
   */
  @Get('clean')
  async cleanCache(): Promise<any> {
    this.cacheService.cleanCache();
  }

  /**
   * @description clean memory cache
   */
  @Get('flush')
  async flush(): Promise<any> {
    this.cacheService.flush();
  }
}
