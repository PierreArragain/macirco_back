import { featureCollectionMock } from '../../domain/mocks/feature.mock';

export class AddressServiceMock {
  getCoordinates = jest.fn().mockResolvedValue(featureCollectionMock);
}
