import { Injectable, Logger } from '@nestjs/common';
import { MpService } from '../../mp/application/mp.service';
import { MpEntity } from '../../mp/domain/mp.entity';
import { GetMPDto } from '../domain/get-mp.dto';
import { MpResultDto } from '../domain/mp-result.dto';
import { AddressService } from '../infrastructure/address.service';

@Injectable()
export class CustomResultsService {
  private readonly logger = new Logger(CustomResultsService.name);
  constructor(
    private readonly mpService: MpService,
    private readonly addressService: AddressService,
  ) {}

  public async getMpByAddress(getMpDto: GetMPDto): Promise<MpResultDto> {
    try {
      const coordinates = await this.getCoordinatesByAddress(getMpDto);
      const mp = await this.mpService.findMpByCoordinatesInDb(coordinates);
      return this.mpEntityToMpResultDto(mp);
    } catch (error) {
      this.logger.error(
        `Error when trying to get a mp by address : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }

  public async getCoordinatesByAddress(getMpDto: GetMPDto): Promise<number[]> {
    const address = this.getMpDtoToAddress(getMpDto);
    const featureCollection = await this.addressService.getCoordinates(address);
    const geometry = featureCollection.features[0].geometry;
    if (geometry.type === 'Point') {
      return geometry.coordinates;
    }
    throw new Error('Invalid geometry type');
  }

  private getMpDtoToAddress(getMpDto: GetMPDto): string {
    let address = `${getMpDto.streetNumber} ${getMpDto.streetName} ${getMpDto.postCode} ${getMpDto.city}`;
    address = address.replace(/ /g, '+');
    return address;
  }

  private mpEntityToMpResultDto(mp: MpEntity): MpResultDto {
    const mpResultDto = new MpResultDto();
    mpResultDto.surname = mp.surname;
    mpResultDto.firstName = mp.firstName;
    mpResultDto.gender = mp.gender;
    mpResultDto.parliamentaryGroup = mp.parliamentaryGroup.name;
    mpResultDto.party = mp.party;
    mpResultDto.profession = mp.profession;
    mpResultDto.picture = mp.picture;
    mpResultDto.inActivity = mp.inActivity;
    mpResultDto.link = mp.link;
    mpResultDto.email = mp.email;
    mpResultDto.department = mp.constituencies[0].department;
    mpResultDto.constituency = mp.constituencies[0].code;
    mpResultDto.nosDeputesSlug = mp.nosDeputesSlug;

    return mpResultDto;
  }
}
