import { Component, OnInit, effect, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { ResponsiveService } from './core/services/responsive.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ResponsiveHelperComponent, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private responsiveService = inject(ResponsiveService);

  @HostBinding('class') 
  get hostClasses(): string {
    return this.responsiveService.getResponsiveClasses().join(' ');
  }

  constructor() {
    // React to responsive changes and update body classes
    effect(() => {
      const classes = this.responsiveService.getResponsiveClasses();
      const deviceInfo = this.responsiveService.getDeviceInfo();
      
      // Update document body classes for global responsive styling
      document.body.className = document.body.className
        .split(' ')
        .filter(cls => !cls.startsWith('breakpoint-') && 
                      !cls.startsWith('device-') && 
                      !cls.includes('touch') && 
                      !cls.includes('portrait') && 
                      !cls.includes('landscape') &&
                      !cls.includes('reduced-motion'))
        .concat(classes)
        .join(' ');

      // Set CSS custom properties for dynamic responsive values
      document.documentElement.style.setProperty('--screen-width', `${deviceInfo.width}px`);
      document.documentElement.style.setProperty('--screen-height', `${deviceInfo.height}px`);
      document.documentElement.style.setProperty('--pixel-ratio', deviceInfo.pixelRatio.toString());
      
      // Add data attributes for CSS targeting
      document.documentElement.setAttribute('data-device-type', deviceInfo.deviceType);
      document.documentElement.setAttribute('data-breakpoint', deviceInfo.breakpoint);
      document.documentElement.setAttribute('data-orientation', deviceInfo.orientation);
      document.documentElement.setAttribute('data-touch', deviceInfo.isTouch.toString());
    });
  }

  ngOnInit(): void {
    // Initial setup for responsive behavior
    this.setupViewportMeta();
    this.preventZoomOnFocus();
  }

  private setupViewportMeta(): void {
    // Ensure proper viewport meta tag for responsive design
    let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }

    // Set optimal viewport configuration
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover';
  }

  private preventZoomOnFocus(): void {
    // Prevent iOS zoom on input focus while maintaining accessibility
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          if (input instanceof HTMLElement) {
            const fontSize = window.getComputedStyle(input).fontSize;
            if (parseFloat(fontSize) < 16) {
              input.style.fontSize = '16px';
              input.addEventListener('blur', () => {
                input.style.fontSize = '';
              }, { once: true });
            }
          }
        });
      });
    }
  }
}
