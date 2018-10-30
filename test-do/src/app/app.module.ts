import { ConfigDataFetcherService } from './shared/services/ConfigDataFetcher.service';
import { BaseUrlService } from './shared/services/baseUrl.service';
import { HomeModule } from './home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './shared/services/projects.service';
import { ProjectListsService } from './shared/services/projectLists.service';
import { ToDoItemService } from './shared/services/toDoItem.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    HomeModule
  ],
  providers: [
    ProjectService,
    ProjectListsService,
    ToDoItemService,
    BaseUrlService,
    ConfigDataFetcherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
