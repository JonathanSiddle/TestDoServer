import { BaseUrlService } from './baseUrl.service';
import { ToDoItem } from './../models/todoItem';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from './data.service';

@Injectable()
export class ToDoItemService extends DataService<ToDoItem> {
    constructor(
        public baseUrlService: BaseUrlService,
        protected http: HttpClient) {
        super(baseUrlService, 'ListItem', http);
    }
}
