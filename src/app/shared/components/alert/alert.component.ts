import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

export type AlertType = 'success' | 'error' | 'warning' | 'info';
export interface AlertData {
  title?: string;
  message: string;
  buttonText?: string;
  type?: AlertType;
  route?: string;
  actionText?: string;
  actionRoute?: string;
}

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Outer container with backdrop blur and improved animation -->
    <div 
      role="dialog" 
      aria-modal="true" 
      class="animate-modal-enter mx-auto w-full overflow-visible backdrop-blur-sm">
      
      <!-- Card with enhanced shadow and border -->
      <div class="relative overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black/10 dark:bg-slate-900 dark:ring-slate-700">
        
        <!-- Enhanced header gradient with subtle pattern -->
        <div class="relative h-16 bg-gradient-to-r from-indigo-600 to-cyan-400">
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-20"></div>
        </div>
        
        <!-- Enhanced floating icon with shadow and animation -->
        <div class="pointer-events-none absolute left-6 top-0 z-30 -translate-y-1/2 animate-float">
          <div
            [ngClass]="iconWrapperClasses"
            class="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white shadow-lg transition-all duration-300 hover:shadow-xl">
            <!-- Enhanced SVG icons with subtle animations -->
            <ng-container [ngSwitch]="data.type">
              <svg
                *ngSwitchCase="'success'"
                class="h-8 w-8 text-emerald-700 animate-pulse-once"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              <svg
                *ngSwitchCase="'error'"
                class="h-8 w-8 text-red-600 animate-shake-once"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true">
                <path
                  d="M12 9v4"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
                <path
                  d="M12 17h.01"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              <svg 
                *ngSwitchDefault 
                class="h-8 w-8 text-sky-600 animate-pulse-once" 
                viewBox="0 0 24 24" 
                fill="none" 
                aria-hidden="true">
                <path
                  d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                  stroke="currentColor"
                  stroke-width="0.8"
                  fill="currentColor" />
                <path d="M11 10h2v6h-2zM11 7h2v1h-2z" fill="white" />
              </svg>
            </ng-container>
          </div>
        </div>
        
        <!-- Improved close button with better hover state -->
        <button
          (click)="onClose()"
          class="absolute right-4 top-4 rounded-full border border-white/20 bg-white/90 p-2.5 text-slate-700 shadow-md transition-all duration-200 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200"
          aria-label="Close dialog">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M10 8.586L3.293 1.879 1.879 3.293 8.586 10l-6.707 6.707 1.414 1.414L10 11.414l6.707 6.707 1.414-1.414L11.414 10l6.707-6.707-1.414-1.414L10 8.586z"
              clip-rule="evenodd" />
          </svg>
        </button>
        
        <!-- Enhanced content with better typography and spacing -->
        <div class="px-6 pt-8 pb-6">
          <div class="ml-20">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">
              {{ data.title || defaultTitle }}
            </h3>
            <p class="mt-3 break-words text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {{ data.message }}
            </p>
          </div>
        </div>
        
        <!-- Improved footer with better button styling -->
        <div
          class="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/80 px-6 py-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60">
          <button
            *ngIf="data.actionText"
            (click)="onAction()"
            class="rounded-md border px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 hover:shadow-md"
            [ngClass]="actionBtnClasses">
            {{ data.actionText }}
          </button>
          <button
            (click)="onClose()"
            class="rounded-md px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 hover:shadow-md"
            [ngClass]="primaryBtnClasses">
            {{ data.buttonText || 'OK' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* Enhanced modal animation */
      @keyframes modalEnter {
        0% {
          transform: translateY(-12px) scale(0.96);
          opacity: 0;
        }
        100% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
      }
      .animate-modal-enter {
        animation: modalEnter 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      }
      
      /* Floating animation for icon */
      @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-5px) translateX(2px); }
      }
      .animate-float {
        animation: float 4s ease-in-out infinite;
      }
      
      /* Icon animations */
      @keyframes pulseOnce {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      .animate-pulse-once {
        animation: pulseOnce 0.5s ease-out;
      }
      
      @keyframes shakeOnce {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      .animate-shake-once {
        animation: shakeOnce 0.4s ease-out;
      }
      
      /* Improved button focus states */
      button:focus {
        outline: none;
      }
      
      /* Better text wrapping */
      .break-words {
        word-break: break-word;
        hyphens: auto;
      }
      
      /* Fallback for rounded corners if Tailwind classes don't work */
      .rounded-lg {
        border-radius: 0.5rem;
      }
      
      .rounded-md {
        border-radius: 0.375rem;
      }
      
      .rounded-full {
        border-radius: 9999px;
      }
    `,
  ],
})
export class AlertDialogComponent {
  defaultTitle = 'Notice';
  
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: AlertData,
  ) {
    if (!data.title) {
      this.defaultTitle = this.titleForType(data.type || 'success');
    } else {
      this.defaultTitle = data.title;
    }
  }

  private titleForType(t: AlertType) {
    switch (t) {
      case 'error': return 'Error';
      case 'warning': return 'Warning';
      case 'info': return 'Information';
      default: return 'Success';
    }
  }

  // Enhanced icon wrapper with better gradients
  get iconWrapperClasses(): string {
    switch (this.data.type) {
      case 'error':
        return 'bg-gradient-to-tr from-red-100 to-red-50 text-red-700 dark:from-red-900/30 dark:to-red-800/20';
      case 'warning':
        return 'bg-gradient-to-tr from-amber-100 to-amber-50 text-amber-700 dark:from-amber-900/30 dark:to-amber-800/20';
      case 'info':
        return 'bg-gradient-to-tr from-sky-100 to-sky-50 text-sky-700 dark:from-sky-900/30 dark:to-sky-800/20';
      default:
        return 'bg-gradient-to-tr from-emerald-100 to-emerald-50 text-emerald-700 dark:from-emerald-900/30 dark:to-emerald-800/20';
    }
  }

  // Enhanced primary button with better gradients
  get primaryBtnClasses(): string {
    switch (this.data.type) {
      case 'error':
        return 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 focus:ring-red-300 dark:from-red-700 dark:to-red-600';
      case 'warning':
        return 'bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:from-amber-700 hover:to-amber-600 focus:ring-amber-300 dark:from-amber-700 dark:to-amber-600';
      case 'info':
        return 'bg-gradient-to-r from-sky-600 to-sky-500 text-white hover:from-sky-700 hover:to-sky-600 focus:ring-sky-300 dark:from-sky-700 dark:to-sky-600';
      default:
        return 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 focus:ring-emerald-300 dark:from-emerald-700 dark:to-emerald-600';
    }
  }

  // Enhanced action button with better hover states
  get actionBtnClasses(): string {
    switch (this.data.type) {
      case 'error':
        return 'border-red-200 text-red-700 hover:bg-red-50 focus:ring-red-200 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/30';
      case 'warning':
        return 'border-amber-200 text-amber-700 hover:bg-amber-50 focus:ring-amber-200 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-900/30';
      case 'info':
        return 'border-sky-200 text-sky-700 hover:bg-sky-50 focus:ring-sky-200 dark:border-sky-800 dark:text-sky-300 dark:hover:bg-sky-900/30';
      default:
        return 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-200 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-900/30';
    }
  }

  onClose(): void {
    this.dialogRef.close();
    if (this.data?.route) {
      setTimeout(() => this.router.navigate([this.data.route]), 200);
    }
  }

  onAction(): void {
    this.dialogRef.close('action');
    if (this.data?.actionRoute) {
      setTimeout(() => this.router.navigate([this.data.actionRoute]), 200);
    }
  }
}