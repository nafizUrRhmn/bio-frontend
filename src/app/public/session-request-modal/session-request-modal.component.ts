import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-session-request-modal',
  templateUrl: './session-request-modal.component.html',
  styleUrls: ['./session-request-modal.component.scss']
})
export class SessionRequestModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SessionRequestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeModal(): void {
    this.dialogRef.close();
  }
  
}
