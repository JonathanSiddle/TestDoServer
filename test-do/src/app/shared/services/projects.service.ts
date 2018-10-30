import { BaseUrlService } from './baseUrl.service';
import { ToDoProject } from './../models/todoProject';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProjectService extends DataService<ToDoProject> {
    constructor(
        public baseUrlService: BaseUrlService,
        protected http: HttpClient) {
        super(baseUrlService, 'Project', http);
    }
}
