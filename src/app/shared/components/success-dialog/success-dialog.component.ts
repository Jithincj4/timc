import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  template: `
    <div class="dialog-container">
      <h2 class="dialog-title">{{ data.title }}</h2>
      <p class="dialog-message">{{ data.message }}</p>
      <button mat-button class="dialog-button" (click)="onClose()">{{ data.buttonText }}</button>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        text-align: center;
        padding: 20px;
      }
      .dialog-title {
        font-size: 24px;
        margin-bottom: 10px;
      }
      .dialog-message {
        font-size: 16px;
        margin-bottom: 20px;
      }
      .dialog-button {
        background-color: #4caf50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .dialog-button:hover {
        background-color: #45a049;
      }
    `,
  ],
})
export class SuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; buttonText: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
