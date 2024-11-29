import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/database/mongoose-config.service';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database/database.config';
import appConfig from './config/main/app.config';
import authConfig from './config/auth/auth.config';

const infrastructureDatabaseModule = MongooseModule.forRootAsync({
  useClass: MongooseConfigService,
});

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig
      ],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    AuthModule
  ]
})
export class AppModule {}
