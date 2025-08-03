import { Directive, ElementRef, Input, OnInit, OnDestroy, effect, inject } from '@angular/core';
import { ResponsiveService } from '../../core/services/responsive.service';

@Directive({
  selector: '[appResponsive]',
  standalone: true
})
export class ResponsiveDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private responsiveService = inject(ResponsiveService);

  @Input('appResponsive') config: {
    classes?: {
      mobile?: string[];
      tablet?: string[];
      desktop?: string[];
      touch?: string[];
      noTouch?: string[];
      portrait?: string[];
      landscape?: string[];
    };
    styles?: {
      mobile?: { [key: string]: string };
      tablet?: { [key: string]: string };
      desktop?: { [key: string]: string };
      touch?: { [key: string]: string };
      noTouch?: { [key: string]: string };
    };
    attributes?: {
      mobile?: { [key: string]: string };
      tablet?: { [key: string]: string };
      desktop?: { [key: string]: string };
    };
  } = {};

  private appliedClasses: string[] = [];

  constructor() {
    // Use effect to react to responsive service changes
    effect(() => {
      const deviceType = this.responsiveService.deviceType();
      const isTouch = this.responsiveService.isTouch();
      const orientation = this.responsiveService.isPortrait() ? 'portrait' : 'landscape';
      
      this.updateElement(deviceType, isTouch, orientation);
    });
  }

  ngOnInit(): void {
    this.updateElement(
      this.responsiveService.deviceType(),
      this.responsiveService.isTouch(),
      this.responsiveService.isPortrait() ? 'portrait' : 'landscape'
    );
  }

  ngOnDestroy(): void {
    this.clearAppliedClasses();
  }

  private updateElement(deviceType: string, isTouch: boolean, orientation: string): void {
    if (!this.elementRef?.nativeElement) return;

    const element = this.elementRef.nativeElement;

    // Clear previously applied classes
    this.clearAppliedClasses();

    // Apply device-specific classes
    this.applyClasses(deviceType, isTouch, orientation);

    // Apply device-specific styles
    this.applyStyles(deviceType, isTouch);

    // Apply device-specific attributes
    this.applyAttributes(deviceType);
  }

  private applyClasses(deviceType: string, isTouch: boolean, orientation: string): void {
    const { classes } = this.config;
    if (!classes) return;

    const classesToAdd: string[] = [];

    // Device type classes
    if (classes[deviceType as keyof typeof classes]) {
      classesToAdd.push(...(classes[deviceType as keyof typeof classes] as string[]));
    }

    // Touch classes
    if (isTouch && classes.touch) {
      classesToAdd.push(...classes.touch);
    } else if (!isTouch && classes.noTouch) {
      classesToAdd.push(...classes.noTouch);
    }

    // Orientation classes
    if (classes[orientation as keyof typeof classes]) {
      classesToAdd.push(...(classes[orientation as keyof typeof classes] as string[]));
    }

    // Apply classes
    classesToAdd.forEach(className => {
      this.elementRef.nativeElement.classList.add(className);
      this.appliedClasses.push(className);
    });
  }

  private applyStyles(deviceType: string, isTouch: boolean): void {
    const { styles } = this.config;
    if (!styles) return;

    const element = this.elementRef.nativeElement;

    // Apply device-specific styles
    const deviceStyles = styles[deviceType as keyof typeof styles];
    if (deviceStyles) {
      Object.entries(deviceStyles).forEach(([property, value]) => {
        element.style[property] = value;
      });
    }

    // Apply touch-specific styles
    const touchStyles = isTouch ? styles.touch : styles.noTouch;
    if (touchStyles) {
      Object.entries(touchStyles).forEach(([property, value]) => {
        element.style[property] = value;
      });
    }
  }

  private applyAttributes(deviceType: string): void {
    const { attributes } = this.config;
    if (!attributes) return;

    const element = this.elementRef.nativeElement;
    const deviceAttributes = attributes[deviceType as keyof typeof attributes];

    if (deviceAttributes) {
      Object.entries(deviceAttributes).forEach(([attribute, value]) => {
        element.setAttribute(attribute, value);
      });
    }
  }

  private clearAppliedClasses(): void {
    this.appliedClasses.forEach(className => {
      this.elementRef.nativeElement?.classList.remove(className);
    });
    this.appliedClasses = [];
  }
}