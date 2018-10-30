import { BaseUrlService } from './baseUrl.service';
import { ElementRef } from '@angular/core';
import { Config } from '../models/config';
import { AccessTokenService } from './accessToken.service';

export class ConfigDataFetcherService {
    constructor() {}

    getConfigValues(elRf: ElementRef, attribute: string): Config {
        const data = elRf.nativeElement.getAttribute(attribute);
        console.log(`Data in configFetcher: '${data}'`);
        return JSON.parse(data);
    }
}
