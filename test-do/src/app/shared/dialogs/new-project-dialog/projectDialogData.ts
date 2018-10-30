import { ToDoProject } from './../../models/todoProject';

export class ProjectDialogData {
    constructor(
    public existingNames: string[],
    public projectName: string,
    public editMode: boolean) {}
}
