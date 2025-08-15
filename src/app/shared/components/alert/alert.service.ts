import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent, AlertData } from './alert.component';
import { AlertType } from './alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  // Success Alert
  showSuccess(
    message: string, 
    options: { title?: string; buttonText?: string; route?: string } = {}
  ) {
    const data: AlertData = {
      title: options.title || 'Success',
      message,
      type: 'success',
      buttonText: options.buttonText || 'OK',
      route: options.route
    };
    
    return this.dialog.open(AlertDialogComponent, {
      data,
      width: '500px',
      panelClass: 'custom-alert-panel'
    });
  }

  // Error Alert
  showError(
    message: string, 
    options: { title?: string; buttonText?: string; route?: string } = {}
  ) {
    const data: AlertData = {
      title: options.title || 'Error',
      message,
      type: 'error',
      buttonText: options.buttonText || 'OK',
      route: options.route
    };
    
    return this.dialog.open(AlertDialogComponent, {
      data,
      width: '500px',
      panelClass: 'custom-alert-panel'
    });
  }

  // Warning Alert
  showWarning(
    message: string, 
    options: { title?: string; buttonText?: string; actionText?: string; route?: string; actionRoute?: string } = {}
  ) {
    const data: AlertData = {
      title: options.title || 'Warning',
      message,
      type: 'warning',
      buttonText: options.buttonText || 'OK',
      actionText: options.actionText,
      route: options.route,
      actionRoute: options.actionRoute
    };
    
    return this.dialog.open(AlertDialogComponent, {
      data,
      width: '500px',
      panelClass: 'custom-alert-panel'
    });
  }

  // Info Alert
  showInfo(
    message: string, 
    options: { title?: string; buttonText?: string; actionText?: string; route?: string; actionRoute?: string } = {}
  ) {
    const data: AlertData = {
      title: options.title || 'Information',
      message,
      type: 'info',
      buttonText: options.buttonText,
      actionText: options.actionText,
      route: options.route,
      actionRoute: options.actionRoute
    };
    
    return this.dialog.open(AlertDialogComponent, {
      data,
      width: '500px',
      panelClass: 'custom-alert-panel'
    });
  }

  // Generic Alert (for custom types)
  showAlert(
    message: string, 
    type: AlertType,
    options: { title?: string; buttonText?: string; actionText?: string; route?: string; actionRoute?: string } = {}
  ) {
    const data: AlertData = {
      title: options.title || 'Notice',
      message,
      type,
      buttonText: options.buttonText || 'OK',
      actionText: options.actionText,
      route: options.route,
      actionRoute: options.actionRoute
    };
    
    return this.dialog.open(AlertDialogComponent, {
      data,
      width: '500px',
      panelClass: 'custom-alert-panel'
    });
  }

  // Confirm Alert
  showConfirm(
    message: string, 
    options: { 
      title?: string; 
      confirmText?: string; 
      cancelText?: string; 
      confirmRoute?: string; 
      cancelRoute?: string 
    } = {}
  ) {
    const data: AlertData = {
      title: options.title || 'Confirm',
      message,
      type: 'confirm',
      buttonText: options.confirmText || 'OK',
      actionText: options.cancelText || 'Cancel',
      route: options.confirmRoute,
      actionRoute: options.cancelRoute
    };

    return this.dialog.open(AlertDialogComponent, {
      data,
      width: '500px',
      panelClass: 'custom-alert-panel'
    });
  }
}
