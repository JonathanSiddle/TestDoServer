import { UseFakeBackendService } from './useFakeBackend.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToDoProject } from '../models/todoProject';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    public sampleProjects: Array<ToDoProject>;
    public useFakeBackend: boolean;

    constructor(useFakeBackendService: UseFakeBackendService) {
        this.useFakeBackend = useFakeBackendService.useFakeBackend;
        // set up data
        this.sampleProjects = JSON.parse(localStorage.getItem('testData'));
        if (!this.sampleProjects) {
            this.sampleProjects = new Array<ToDoProject>(
                new ToDoProject('TestProject1', 'Test', 1),
                new ToDoProject('TestProject2', 'Test', 2),
                new ToDoProject('TestProject3', 'Test', 3),
            );
            this.saveTestData(this.sampleProjects);
        }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.useFakeBackend) {
            console.log(`Using fakebackend`);
            console.log(`With URL: ${request.url}`);
            console.dir(request);
            if (request.url.endsWith('Project') || request.url.match('Project/\\d+$')) {
                console.log(`dealing with fake projects`);
                return this.handleProjectsRequest(request);
            }

            // if request is not explicitly handled
            // just use default behaviour
            return next.handle(request);
        } else {
            return next.handle(request);
        }
    }

    handleProjectsRequest(r: HttpRequest<any>): Observable<HttpResponse<any>> {

        if (r.url.endsWith('Project') && r.method === 'GET') {

            // cheap hack to get a deep copy of array to avoid conflicts,
            // do not do in production 
            const projCopy  = JSON.parse(JSON.stringify(this.sampleProjects));
            return of(new HttpResponse({status: 200, body: projCopy}));
        } else if (r.url.endsWith('Project') && r.method === 'POST') {

            const inData: ToDoProject = JSON.parse(r.body);
            const newProject = new ToDoProject(inData.name, inData.owner, this.sampleProjects.length + 1);
            this.sampleProjects.push(newProject);
            this.saveTestData(this.sampleProjects);
            return of(new HttpResponse({status: 200, body: newProject}));
        } else if (r.url.match('Project/\\d+$') && r.method === 'PUT') {

            const inData: ToDoProject = JSON.parse(r.body);
            const cIndex = this.sampleProjects.findIndex(p => p.id.toString() === inData.id.toString());
            this.sampleProjects.splice(cIndex, 1, new ToDoProject(inData.name, inData.owner, inData.id));
            this.saveTestData(this.sampleProjects);
            const newProject = new ToDoProject(inData.name, inData.owner, inData.id);
            // const id = r.url.match('Project/\\d+$');
            return of(new HttpResponse({status: 200, body: newProject})); // no content
        } else if (r.url.match('Project/\\d+$') && r.method === 'DELETE') {
            const id = r.url.match('Project/\\d+$');
            return of(new HttpResponse({status: 204})); // no content
        }

        return throwError({ error: { message: 'Unauthorised' } });
    }

    saveTestData(projects: Array<ToDoProject>) {
        localStorage.setItem('testData', JSON.stringify(projects));
    }
}
