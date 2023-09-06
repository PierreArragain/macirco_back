import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MpEntity } from '../../mp/domain/mp.entity';

@Entity()
export class ConstituencyEntity {
  @PrimaryGeneratedColumn()
  idConstituency: number;

  @Column('text', { nullable: true })
  department: string;

  @Column('text')
  code: string;

  @Column({
    type: 'geometry',
    srid: 4326,
    nullable: true,
    spatialFeatureType: 'Polygon',
  })
  polygon: object;

  @ManyToOne(() => MpEntity, (mp) => mp.constituencies)
  mp: MpEntity;
}
