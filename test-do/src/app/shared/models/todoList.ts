import { ToDoItem } from './todoItem';
import { ToDoProject } from './todoProject';

export class ToDoList {
    constructor(
        public name: string = '',
        public owner: string = '',
        public projectId: number,
        public id?: number,
        public items?: ToDoItem[],
        public project?: ToDoProject) {}
}
