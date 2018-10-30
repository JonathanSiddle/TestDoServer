import { YesNoDialogViewComponent } from './dialogs/yes-no-dialog-view/yes-no-dialog-view.component';
import { YesNoDialogComponent } from './dialogs/yes-no-dialog/yes-no-dialog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatIconModule, MatSidenavModule, MatButtonModule, MatToolbarModule, MatTableModule } from '@angular/material';
import { MaterialImportsModule } from './material-imports.module';
import { NewProjectDialogComponent } from './dialogs/new-project-dialog/new-project-dialog.component';
import { FormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialImportsModule,
    FormsModule
  ],
  declarations: [NavBarComponent, NewProjectDialogComponent, YesNoDialogComponent, YesNoDialogViewComponent],
  exports: [
    MaterialImportsModule,
    // my components
    NavBarComponent,
    YesNoDialogComponent
  ]
})
export class SharedModule { }
