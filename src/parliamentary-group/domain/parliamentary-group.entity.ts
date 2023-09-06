import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MpEntity } from '../../mp/domain/mp.entity';

@Entity()
export class ParliamentaryGroupEntity {
  @PrimaryGeneratedColumn()
  idParliamentaryGroup: number;

  @Column('text', { nullable: true })
  name: string;

  @Column('text', { nullable: true })
  acronym: string;

  @Column('text', { nullable: true })
  logo: string;

  @OneToMany(() => MpEntity, (mp) => mp.parliamentaryGroup)
  mps: MpEntity[];
}
