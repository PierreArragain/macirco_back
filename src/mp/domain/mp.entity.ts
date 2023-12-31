import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConstituencyEntity } from '../../constituency/domain/constituency.entity';
import { ParliamentaryGroupEntity } from '../../parliamentary-group/domain/parliamentary-group.entity';

@Entity()
export class MpEntity {
  @PrimaryGeneratedColumn()
  idMp: number;

  @Column('text')
  surname: string;

  @Column('text')
  firstName: string;

  @Column('text')
  gender: string;

  @Column('text', { nullable: true })
  party: string;

  @Column('text', { nullable: true })
  profession: string;

  @Column('text', { nullable: true })
  picture: string;

  @Column('boolean', { default: true })
  inActivity: boolean;

  @Column('text', { nullable: true })
  link: string;

  @Column('text', { nullable: true })
  email: string;

  @Column('text', { nullable: true })
  nosDeputesSlug: string;

  @OneToMany(() => ConstituencyEntity, (constituency) => constituency.mp)
  constituencies: ConstituencyEntity[];

  @ManyToOne(
    () => ParliamentaryGroupEntity,
    (parliamentaryGroup) => parliamentaryGroup.mps,
  )
  parliamentaryGroup: ParliamentaryGroupEntity;
}
