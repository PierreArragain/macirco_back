import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { FeatureCollection } from 'typeorm';

@Injectable()
export class AddressService {
  private readonly logger = new Logger(AddressService.name);

  constructor(private readonly httpService: HttpService) {}
  async getCoordinates(address: string): Promise<FeatureCollection> {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${address}&limit=1`;
    try {
      return await lastValueFrom(
        this.httpService.get(url).pipe(map((response) => response.data)),
      );
    } catch (error) {
      this.logger.error(
        `Error when trying to get coordinates from address : ${error.name} = ${error.message}`,
      );
      throw error;
    }
  }
}
