import { ApiProperty } from '@nestjs/swagger';

export class GetMPDto {
  @ApiProperty()
  streetNumber: number;
  @ApiProperty()
  streetName: string;
  @ApiProperty()
  postCode: number;
  @ApiProperty()
  city: string;
}
