import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'app-alert-dialog',
  imports: [CommonModule],
  template: `
    <div class="dialog-container" [ngClass]="typeClass">
      <h2 class="dialog-title">{{ data.title || defaultTitle }}</h2>
      <p class="dialog-message">{{ data.message }}</p>
      <button mat-button class="dialog-button" (click)="onClose()">
        {{ data.buttonText || 'OK' }}
      </button>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        text-align: center;
        padding: 20px;
        border-radius: 6px;
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
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: white;
      }

      /* Success styles (default) */
      .success .dialog-button {
        background-color: #4caf50;
      }
      .success .dialog-button:hover {
        background-color: #45a049;
      }

      /* Error styles */
      .error .dialog-button {
        background-color: #f44336;
      }
      .error .dialog-button:hover {
        background-color: #d32f2f;
      }

      /* Warning styles */
      .warning .dialog-button {
        background-color: #ff9800;
      }
      .warning .dialog-button:hover {
        background-color: #ef6c00;
      }

      /* Info styles */
      .info .dialog-button {
        background-color: #2196f3;
      }
      .info .dialog-button:hover {
        background-color: #1976d2;
      }
    `,
  ],
})
export class AlertDialogComponent {
  defaultTitle = 'Success';
  typeClass: string;

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: { title?: string; message: string; buttonText?: string; type?: AlertType; route?: string }
  ) {
    // Default to success if not specified
    this.typeClass = data.type || 'success';

    // Default title based on type if not provided
    if (!data.title) {
      this.defaultTitle =
        this.typeClass.charAt(0).toUpperCase() + this.typeClass.slice(1);
    }
  }

  onClose(): void {
    this.dialogRef.close();
    if (this.data.route) {
      this.router.navigate([this.data.route]);
    }
  }
}
