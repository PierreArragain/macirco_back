import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfiguration } from './common/config/database/database.configuration';
import { getEnvPath } from './common/helpers/env.helper';
import { ConstituencyModule } from './constituency/constituency.module';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';
import { MpModule } from './mp/mp.module';
import { ParliamentaryGroupModule } from './parliamentary-group/parliamentary-group.module';
import { CustomResultsModule } from './custom-results/custom-results.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    HealthModule,
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfiguration,
    }),
    TerminusModule,
    ConstituencyModule,
    MpModule,
    ParliamentaryGroupModule,
    CustomResultsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
