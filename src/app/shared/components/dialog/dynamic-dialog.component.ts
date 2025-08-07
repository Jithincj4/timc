import {
  Component,
  Inject,
  ViewChild,
  ViewContainerRef,
  Type,
  ComponentRef,
  AfterViewInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-dialog',
 templateUrl: './dynamic-dialog.component.html',
})
export class DynamicDialogComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  componentRef!: ComponentRef<any>;

  constructor(
    public dialogRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { component: Type<any>; inputs?: any }
  ) {}

  ngAfterViewInit(): void {
    this.container.clear();
    this.componentRef = this.container.createComponent(this.data.component);
    if (this.data.inputs) {
      Object.assign(this.componentRef.instance, this.data.inputs);
    }

    // Optional: close dialog from inner component
    if (this.componentRef.instance['dialogRef'] === undefined) {
      this.componentRef.instance['dialogRef'] = this.dialogRef;
    }
    const instance = this.componentRef.instance;
    if (instance.saved && instance.saved.subscribe) {
      instance.saved.subscribe(() => {
        this.dialogRef.close('saved');
      });
    }
  }
}
