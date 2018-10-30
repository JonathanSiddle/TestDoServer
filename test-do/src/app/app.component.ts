import { ConfigDataFetcherService } from './shared/services/ConfigDataFetcher.service';
import { Component, ElementRef } from '@angular/core';
import { BaseUrlService } from './shared/services/baseUrl.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private elRef: ElementRef,
    private baseUrlService: BaseUrlService,
    private configDataFetcher: ConfigDataFetcherService
  ) {
    // always need to get this data here...ngInit is too late apparently...
    const configData = this.configDataFetcher.getConfigValues(this.elRef, 'config');
    this.baseUrlService.baseUrl = configData.baseUrl;
    // console.log(`Got baseUrlService ${this.baseUrlService.baseUrl}`);
  }

  ngInit() {

  }
}
