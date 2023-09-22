import { FeatureCollection } from 'typeorm/driver/types/GeoJsonTypes';

export const featureCollectionMock: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.333029, 48.873827],
      },
      properties: {
        label: "48 Rue de la Chaussée d'Antin 75009 Paris",
        score: 0.9730236363636364,
        housenumber: '48',
        id: '75109_1949_00048',
        name: "48 Rue de la Chaussée d'Antin",
        postcode: '75009',
        citycode: '75109',
        x: 651078.6,
        y: 6863962.47,
        city: 'Paris',
        district: 'Paris 9e Arrondissement',
        context: '75, Paris, Île-de-France',
        type: 'housenumber',
        importance: 0.70326,
        street: "Rue de la Chaussée d'Antin",
      },
    },
  ],
};
