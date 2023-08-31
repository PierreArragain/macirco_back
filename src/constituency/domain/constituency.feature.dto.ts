export class ConstituencyFeatureDto {
  type: string;
  properties: {
    REF: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}
