import { container } from 'tsyringe';

import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import RedisCacheProvider from './implementatios/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);
