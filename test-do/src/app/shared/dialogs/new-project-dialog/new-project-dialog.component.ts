import { Component, OnInit, Inject } from '@angular/core';
import { ToDoProject } from '../../models/todoProject';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectDialogData } from './projectDialogData';
import { FormControl, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.css']
})
export class NewProjectDialogComponent implements OnInit {

  public existingNames = Array<string>();
  public name = '';

  get isValid() {
    return (this.name.trim().length > 0 &&
      this.existingNames.filter(tdp => tdp.trim() === this.name.trim()).length === 0);
  }

  constructor(public dialogRef: MatDialogRef<NewProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectDialogData) {
      this.existingNames = data.existingNames;
      if (data.editMode) {
        console.log('EditMode, setting project name');
        this.name = data.projectName;
      }
    }

  ngOnInit() {
  }

  clickedSave() {
    console.log('Hit dialog save!');
    this.data.projectName = this.name;
    this.dialogRef.close(this.data);
  }
}
