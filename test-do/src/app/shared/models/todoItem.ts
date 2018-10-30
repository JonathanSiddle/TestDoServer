import { ToDoList } from './todoList';

export class ToDoItem {
    constructor(
        public name: string = '',
        public complete: boolean = false,
        public toDoList?: ToDoList,
        public id?: number) {}
}
