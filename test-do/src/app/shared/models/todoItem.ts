import { ToDoList } from './todoList';

export class ToDoItem {
    constructor(
        public name: string = '',
        public complete: boolean = false,
        public toDoListId: number,
        public id?: number,
        public toDoList?: ToDoList) {}
}
