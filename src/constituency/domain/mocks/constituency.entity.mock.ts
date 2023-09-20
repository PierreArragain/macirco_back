import { MpEntity } from '../../../mp/domain/mp.entity';
import { ConstituencyEntity } from '../constituency.entity';

export const constituencyEntityMock: ConstituencyEntity[] = [
  {
    idConstituency: 1,
    department: '001',
    code: '001-02',
    polygon: {
      type: 'Polygon',
      coordinates: [
        [
          [4.7281684, 45.9459841],
          [4.7282435, 45.9475813],
          [4.7286977, 45.9488566],
          [4.729667, 45.9501913],
          [4.7319136, 45.9519356],
          [4.7322324, 45.9521337],
          [4.734933, 45.9536705],
          [4.7393918, 45.9564783],
          [4.740287, 45.9570605],
          [4.7413898, 45.9578692],
          [4.7417307, 45.9580858],
          [4.7458777, 45.9604662],
          [4.7463862, 45.9608199],
          [4.7466535, 45.9610489],
          [4.7485101, 45.9627503],
          [4.7492315, 45.9633951],
          [4.7505535, 45.9646127],
        ],
      ],
    },
    mp: new MpEntity(),
  },
];
