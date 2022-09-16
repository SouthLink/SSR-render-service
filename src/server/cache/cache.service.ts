import { Injectable } from '@nestjs/common';
import { getCacheKey } from '../../utils';

@Injectable()
export class CacheService {
  cleanCache() {
    console.log('clean');
  }

  flush() {
    console.log('flush');
  }
}
