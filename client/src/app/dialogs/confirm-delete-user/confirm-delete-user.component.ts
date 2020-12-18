import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-delete-user',
  templateUrl: './confirm-delete-user.component.html',
  styleUrls: ['./confirm-delete-user.component.scss']
})
export class ConfirmDeleteUserComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
