import { ToDoList } from './todoList';

export class ToDoProject {
    constructor
        (
        public name: string = '',
        public owner: string = '',
        public id?: number,
        public toDoLists?: ToDoList[]
        ) {}
}
