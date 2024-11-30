import { NestFactory } from '@nestjs/core';
import { UserSeedService } from './user/user-seed.service';

import { SeedModule } from './seed.module';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(UserSeedService).run();

  await app.close();
};

void runSeed();
