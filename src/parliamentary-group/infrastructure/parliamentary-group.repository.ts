import { Repository } from 'typeorm';
import { ParliamentaryGroupEntity } from '../domain/parliamentary-group.entity';

export class ParliamentaryGroupRepository extends Repository<ParliamentaryGroupEntity> {}
