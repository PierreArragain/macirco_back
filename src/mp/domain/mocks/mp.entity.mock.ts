import { ParliamentaryGroupEntity } from '../../../parliamentary-group/domain/parliamentary-group.entity';
import { MpEntity } from '../mp.entity';

export const mpEntityMock: MpEntity[] = [
  {
    idMp: 1,
    surname: 'Dupont',
    firstName: 'Jeanne',
    gender: 'F',
    party: 'Europe Écologie Les Verts',
    profession: 'Enseignante',
    picture: 'https://www.nosdeputes.fr/depute/photo/jeanne-dupont.jpg',
    inActivity: true,
    link: 'https://www.nosdeputes.fr/jeanne-dupont',
    email: 'jeanne@assemblee-nationale.fr',
    nosDeputesSlug: 'jeanne-dupont',
    parliamentaryGroup: {
      acronym: 'ECO',
    } as ParliamentaryGroupEntity,
    constituencies: [],
  },
];
