import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConstituencyEntity } from '../../../constituency/domain/constituency.entity';
import { MpEntity } from '../../../mp/domain/mp.entity';
import { ParliamentaryGroupEntity } from '../../../parliamentary-group/domain/parliamentary-group.entity';

@Injectable()
export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [MpEntity, ConstituencyEntity, ParliamentaryGroupEntity],
      synchronize: false,
      logging: false,
      autoLoadEntities: true,
    };
  }
}
