import { Injectable, Logger } from '@nestjs/common';
import { MpService } from '../../mp/application/mp.service';
import { GoogleNewsDto } from '../../mp/domain/google-news.dto';
import { MpResultDto } from '../../mp/domain/mp-result.dto';
import { GoogleNewsService } from '../../mp/infrastructure/google-news.service';
import { GetMPDto } from '../domain/get-mp.dto';
import { AddressService } from '../infrastructure/address.service';

@Injectable()
export class CustomResultsService {
  private readonly logger = new Logger(CustomResultsService.name);
  constructor(
    private readonly mpService: MpService,
    private readonly addressService: AddressService,
    private readonly googleNewsService: GoogleNewsService,
  ) {}

  public async getMpByAddress(getMpDto: GetMPDto): Promise<MpResultDto> {
    try {
      const coordinates = await this.getCoordinatesByAddress(getMpDto);
      const mp = await this.mpService.findMpByCoordinatesInDb(coordinates);
      return this.mpService.mpEntityToMpResultDto(mp);
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

  async getMpNewsByAddress(getMpDto: GetMPDto): Promise<GoogleNewsDto> {
    try {
      const mp = await this.getMpByAddress(getMpDto);
      return this.getMpNews(mp);
    } catch (error) {
      this.logger.error(
        `Error when trying to get a mp's news by address : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }

  async getMpNewsByMpId(mpId: number): Promise<GoogleNewsDto> {
    try {
      const mp = await this.mpService.findMpDtoById(mpId);
      return this.getMpNews(mp);
    } catch (error) {
      this.logger.error(
        `Error when trying to get a mp's news by mpId : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }

  async getMpNews(mp: MpResultDto): Promise<GoogleNewsDto> {
    try {
      const genderQuery = mp.gender === 'H' ? 'député ' : 'députée ';
      const query = `${genderQuery} "${mp.firstName} ${mp.surname}"`;
      return this.googleNewsService.displayResults(query);
    } catch (error) {
      this.logger.error("Error when trying to get a mp's news");
      return undefined;
    }
  }
}
