import { ToDoItem } from './todoItem';

export class ToDoList {
    constructor(
        public name: string = '',
        public owner: string = '',
        public projectId: number,
        public id?: number,
        public items?: ToDoItem[]) {}
}
