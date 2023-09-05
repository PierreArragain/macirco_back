import { Repository } from 'typeorm';
import { MpEntity } from '../domain/mp.entity';

export class MpRepository extends Repository<MpEntity> {}
