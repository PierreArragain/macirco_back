import { Repository } from 'typeorm';
import { ConstituencyEntity } from '../domain/constituency.entity';

export class ConstituencyRepository extends Repository<ConstituencyEntity> {}
