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
    <!-- Outer container with premium backdrop and refined animation -->
<div 
  role="dialog" 
  aria-modal="true" 
  class="animate-modal-enter-premium mx-auto w-full overflow-visible backdrop-blur-xl rounded-2xl shadow-lg max-w-2xl p-0">
  
  <!-- Premium card with multi-layer shadows and refined borders -->
  <div class="relative overflow-hidden  bg-gradient-to-br from-white to-gray-50 shadow-2xl ring-1 ring-gray-200/50 dark:from-slate-900 dark:to-slate-800 dark:ring-slate-700/50">
    
    <!-- Elegant header with metallic gradient and sophisticated pattern -->
    <div class="relative h-20 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 shadow-lg">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-30"></div>
      <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-600/20 to-transparent"></div>
    </div>
    
    <!-- Premium floating icon with metallic finish and refined animation -->
    <div class="pointer-events-none absolute left-8 top-0 z-30 -translate-y-1/2 animate-float-premium">
      <div
        [ngClass]="iconWrapperClasses"
        class="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white shadow-xl transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-slate-800 dark:to-slate-700">
        <!-- Enhanced SVG icons with premium animations and metallic effects -->
        <ng-container [ngSwitch]="data.type">
          <svg
            *ngSwitchCase="'success'"
            class="h-10 w-10 text-emerald-700 animate-pulse-once-premium filter drop-shadow-lg"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <svg
            *ngSwitchCase="'error'"
            class="h-10 w-10 text-red-600 animate-shake-once-premium filter drop-shadow-lg"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true">
            <path
              d="M12 9v4"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M12 17h.01"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <svg 
            *ngSwitchDefault 
            class="h-10 w-10 text-sky-600 animate-pulse-once-premium filter drop-shadow-lg" 
            viewBox="0 0 24 24" 
            fill="none" 
            aria-hidden="true">
            <path
              d="M12 2a10 10 0 100 20 10 10 0 000-20z"
              stroke="currentColor"
              stroke-width="1.2"
              fill="currentColor" />
            <path d="M11 10h2v6h-2zM11 7h2v1h-2z" fill="white" />
          </svg>
        </ng-container>
      </div>
    </div>
    
    <!-- Elegant close button with premium materials and refined hover state -->
    <button
      (click)="onClose()"
      class="absolute right-5 top-5 rounded-full border border-amber-200/30 bg-white/95 p-3 text-slate-700 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:bg-slate-800/90 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-600/30 backdrop-blur-sm"
      aria-label="Close dialog">
      <svg class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fill-rule="evenodd"
          d="M10 8.586L3.293 1.879 1.879 3.293 8.586 10l-6.707 6.707 1.414 1.414L10 11.414l6.707 6.707 1.414-1.414L11.414 10l6.707-6.707-1.414-1.414L10 8.586z"
          clip-rule="evenodd" />
      </svg>
    </button>
    
    <!-- Premium content with refined typography and elegant spacing -->
    <div class="px-8 pt-12 pb-8">
      <div class="ml-24">
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {{ data.title || defaultTitle }}
        </h3>
        <div class="mt-1 h-px w-16 bg-gradient-to-r from-amber-400 to-transparent"></div>
        <p class="mt-4 break-words text-lg leading-relaxed text-slate-600 dark:text-slate-300 font-light">
          {{ data.message }}
        </p>
      </div>
    </div>
    
    <!-- Premium footer with sophisticated button styling -->
    <div
      class="flex items-center justify-end gap-4 border-t border-slate-100/50 bg-gradient-to-b from-white/90 to-gray-50/90 px-8 py-5 backdrop-blur-sm dark:border-slate-800/50 dark:from-slate-900/90 dark:to-slate-800/90">
      <button
        *ngIf="data.actionText"
        (click)="onAction()"
        class="rounded-lg border border-slate-200/50 px-6 py-3 text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:shadow-lg bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-700 dark:border-slate-700"
        [ngClass]="actionBtnClasses">
        {{ data.actionText }}
      </button>
      <button
        (click)="onClose()"
        class="rounded-lg px-7 py-3 text-base font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:shadow-lg bg-gradient-to-r from-amber-500 to-amber-400 text-white hover:from-amber-600 hover:to-amber-500 shadow-md"
        [ngClass]="primaryBtnClasses">
        {{ data.buttonText || 'OK' }}
      </button>
    </div>
    
    <!-- Subtle decorative corner elements -->
    <div class="absolute top-0 left-0 w-16 h-16 overflow-hidden opacity-20">
      <div class="absolute -top-8 -left-8 w-16 h-16 bg-amber-400 rounded-full"></div>
    </div>
    <div class="absolute bottom-0 right-0 w-16 h-16 overflow-hidden opacity-20">
      <div class="absolute -bottom-8 -right-8 w-16 h-16 bg-amber-400 rounded-full"></div>
    </div>
  </div>
</div>


  `,
  styles: [
    `
       @keyframes float-premium {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes pulse-once-premium {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.9; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  @keyframes shake-once-premium {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
    20%, 40%, 60%, 80% { transform: translateX(3px); }
  }
  
  @keyframes modal-enter-premium {
    from { 
      opacity: 0; 
      transform: translateY(20px) scale(0.95);
    }
    to { 
      opacity: 1; 
      transform: translateY(0) scale(1);
    }
  }
  
  .animate-float-premium {
    animation: float-premium 4s ease-in-out infinite;
  }
  
  .animate-pulse-once-premium {
    animation: pulse-once-premium 0.6s ease-in-out;
  }
  
  .animate-shake-once-premium {
    animation: shake-once-premium 0.6s ease-in-out;
  }
  
  .animate-modal-enter-premium {
    animation: modal-enter-premium 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
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