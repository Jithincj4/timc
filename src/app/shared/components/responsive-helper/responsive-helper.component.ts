import { NgIf, NgClass } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

interface DeviceInfo {
  width: number;
  height: number;
  breakpoint: string;
  orientation: string;
  deviceType: string;
  pixelRatio: number;
  isTouch: boolean;
}

@Component({
  selector: 'app-responsive-helper',
  templateUrl: './responsive-helper.component.html',
  styleUrls: ['./responsive-helper.component.css'],
  imports: [NgIf, NgClass],
})
export class ResponsiveHelperComponent implements OnInit, OnDestroy {
  public env: any = environment;
  public deviceInfo = signal<DeviceInfo>({
    width: 0,
    height: 0,
    breakpoint: '',
    orientation: '',
    deviceType: '',
    pixelRatio: 1,
    isTouch: false
  });

  private resizeTimeout: any;

  constructor() {}

  ngOnInit(): void {
    this.updateDeviceInfo();
    this.detectTouchDevice();
  }

  ngOnDestroy(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    // Debounce resize events for better performance
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      this.updateDeviceInfo();
    }, 150);
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(): void {
    // Delay to ensure accurate measurements after orientation change
    setTimeout(() => {
      this.updateDeviceInfo();
    }, 300);
  }

  private updateDeviceInfo(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    this.deviceInfo.update(info => ({
      ...info,
      width,
      height,
      breakpoint: this.getBreakpoint(width),
      orientation: this.getOrientation(width, height),
      deviceType: this.getDeviceType(width),
      pixelRatio: window.devicePixelRatio || 1
    }));
  }

  private getBreakpoint(width: number): string {
    if (width < 475) return 'xs';
    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    if (width < 1536) return 'xl';
    if (width < 1920) return '2xl';
    return '3xl';
  }

  private getOrientation(width: number, height: number): string {
    return width > height ? 'landscape' : 'portrait';
  }

  private getDeviceType(width: number): string {
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private detectTouchDevice(): void {
    const isTouch = 'ontouchstart' in window || 
                   navigator.maxTouchPoints > 0 || 
                   (navigator as any).msMaxTouchPoints > 0;
    
    this.deviceInfo.update(info => ({
      ...info,
      isTouch
    }));
  }

  // Utility methods for components to use
  public isMobile(): boolean {
    return this.deviceInfo().deviceType === 'mobile';
  }

  public isTablet(): boolean {
    return this.deviceInfo().deviceType === 'tablet';
  }

  public isDesktop(): boolean {
    return this.deviceInfo().deviceType === 'desktop';
  }

  public isLandscape(): boolean {
    return this.deviceInfo().orientation === 'landscape';
  }

  public isPortrait(): boolean {
    return this.deviceInfo().orientation === 'portrait';
  }

  public isTouch(): boolean {
    return this.deviceInfo().isTouch;
  }

  public getCurrentBreakpoint(): string {
    return this.deviceInfo().breakpoint;
  }
}
