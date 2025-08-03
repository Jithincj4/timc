import { Injectable, signal, computed } from '@angular/core';
import { fromEvent, debounceTime, startWith } from 'rxjs';

export interface BreakpointConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
}

export interface DeviceCapabilities {
  isTouch: boolean;
  hasHover: boolean;
  pixelRatio: number;
  maxTouchPoints: number;
  orientation: 'portrait' | 'landscape';
  reducedMotion: boolean;
  darkMode: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private readonly breakpoints: BreakpointConfig = {
    xs: 475,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    '3xl': 1920
  };

  // Reactive signals for current state
  private screenWidth = signal<number>(0);
  private screenHeight = signal<number>(0);
  private deviceCapabilities = signal<DeviceCapabilities>({
    isTouch: false,
    hasHover: true,
    pixelRatio: 1,
    maxTouchPoints: 0,
    orientation: 'landscape',
    reducedMotion: false,
    darkMode: false
  });

  // Computed properties
  public currentBreakpoint = computed(() => {
    const width = this.screenWidth();
    if (width < this.breakpoints.xs) return 'xs';
    if (width < this.breakpoints.sm) return 'xs';
    if (width < this.breakpoints.md) return 'sm';
    if (width < this.breakpoints.lg) return 'md';
    if (width < this.breakpoints.xl) return 'lg';
    if (width < this.breakpoints['2xl']) return 'xl';
    if (width < this.breakpoints['3xl']) return '2xl';
    return '3xl';
  });

  public deviceType = computed(() => {
    const width = this.screenWidth();
    if (width < this.breakpoints.md) return 'mobile';
    if (width < this.breakpoints.lg) return 'tablet';
    return 'desktop';
  });

  public isMobile = computed(() => this.deviceType() === 'mobile');
  public isTablet = computed(() => this.deviceType() === 'tablet');
  public isDesktop = computed(() => this.deviceType() === 'desktop');

  public isPortrait = computed(() => 
    this.deviceCapabilities().orientation === 'portrait'
  );
  
  public isLandscape = computed(() => 
    this.deviceCapabilities().orientation === 'landscape'
  );

  public isTouch = computed(() => this.deviceCapabilities().isTouch);
  public hasReducedMotion = computed(() => this.deviceCapabilities().reducedMotion);
  public isDarkMode = computed(() => this.deviceCapabilities().darkMode);

  constructor() {
    this.initializeService();
  }

  private initializeService(): void {
    if (typeof window !== 'undefined') {
      // Initial measurements
      this.updateScreenDimensions();
      this.updateDeviceCapabilities();

      // Listen for resize events with debouncing
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(150),
          startWith(null)
        )
        .subscribe(() => {
          this.updateScreenDimensions();
          this.updateDeviceCapabilities();
        });

      // Listen for orientation changes
      fromEvent(window, 'orientationchange')
        .pipe(debounceTime(300))
        .subscribe(() => {
          // Delay to ensure accurate measurements
          setTimeout(() => {
            this.updateScreenDimensions();
            this.updateDeviceCapabilities();
          }, 100);
        });

      // Listen for media query changes
      this.setupMediaQueryListeners();
    }
  }

  private updateScreenDimensions(): void {
    this.screenWidth.set(window.innerWidth);
    this.screenHeight.set(window.innerHeight);
  }

  private updateDeviceCapabilities(): void {
    const capabilities: DeviceCapabilities = {
      isTouch: this.detectTouchCapability(),
      hasHover: this.detectHoverCapability(),
      pixelRatio: window.devicePixelRatio || 1,
      maxTouchPoints: navigator.maxTouchPoints || 0,
      orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
      reducedMotion: this.detectReducedMotion(),
      darkMode: this.detectDarkMode()
    };

    this.deviceCapabilities.set(capabilities);
  }

  private detectTouchCapability(): boolean {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    );
  }

  private detectHoverCapability(): boolean {
    return window.matchMedia('(hover: hover)').matches;
  }

  private detectReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private detectDarkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private setupMediaQueryListeners(): void {
    // Dark mode listener
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addEventListener('change', () => {
      this.updateDeviceCapabilities();
    });

    // Reduced motion listener
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionQuery.addEventListener('change', () => {
      this.updateDeviceCapabilities();
    });

    // Hover capability listener
    const hoverQuery = window.matchMedia('(hover: hover)');
    hoverQuery.addEventListener('change', () => {
      this.updateDeviceCapabilities();
    });
  }

  // Utility methods for components
  public isBreakpointUp(breakpoint: keyof BreakpointConfig): boolean {
    return this.screenWidth() >= this.breakpoints[breakpoint];
  }

  public isBreakpointDown(breakpoint: keyof BreakpointConfig): boolean {
    return this.screenWidth() < this.breakpoints[breakpoint];
  }

  public isBreakpointBetween(
    minBreakpoint: keyof BreakpointConfig,
    maxBreakpoint: keyof BreakpointConfig
  ): boolean {
    const width = this.screenWidth();
    return width >= this.breakpoints[minBreakpoint] && 
           width < this.breakpoints[maxBreakpoint];
  }

  public getScreenDimensions(): { width: number; height: number } {
    return {
      width: this.screenWidth(),
      height: this.screenHeight()
    };
  }

  public getDeviceInfo(): DeviceCapabilities & { 
    width: number; 
    height: number; 
    breakpoint: string;
    deviceType: string;
  } {
    return {
      ...this.deviceCapabilities(),
      width: this.screenWidth(),
      height: this.screenHeight(),
      breakpoint: this.currentBreakpoint(),
      deviceType: this.deviceType()
    };
  }

  // CSS class helpers
  public getResponsiveClasses(): string[] {
    const classes: string[] = [];
    const breakpoint = this.currentBreakpoint();
    const deviceType = this.deviceType();
    const capabilities = this.deviceCapabilities();

    classes.push(`breakpoint-${breakpoint}`);
    classes.push(`device-${deviceType}`);
    
    if (capabilities.isTouch) classes.push('touch-device');
    if (!capabilities.hasHover) classes.push('no-hover');
    if (capabilities.reducedMotion) classes.push('reduced-motion');
    if (capabilities.orientation === 'portrait') classes.push('portrait');
    if (capabilities.orientation === 'landscape') classes.push('landscape');
    
    return classes;
  }

  // Performance optimization for scroll events
  public createOptimizedScrollListener(
    callback: () => void,
    delay: number = 16
  ): () => void {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }
}