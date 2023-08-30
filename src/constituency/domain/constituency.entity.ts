import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
