import { Injectable } from '@angular/core';
import { APP_STATE_MODES } from '../constants/app-constants';

export interface AppState {
  currentMode: APP_STATE_MODES;
  currentModeRef: any; // You can make this generic for better type safety
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private state: AppState = {
    currentMode: APP_STATE_MODES.initial,
    currentModeRef: 0
  };

  setCurrentMode(mode: APP_STATE_MODES): void {
    this.state.currentMode = mode;
  }

  getCurrentMode(): APP_STATE_MODES {
    return this.state.currentMode;
  }

  setCurrentModeRef(ref: any): void {
    this.state.currentModeRef = ref;
  }

  getCurrentModeRef(): any {
    return this.state.currentModeRef;
  }

  /** Optional: Get full state object */
  getState(): AppState {
    return { ...this.state };
  }

  /** Optional: Reset state to initial */
  resetState(): void {
    this.state = {
      currentMode: APP_STATE_MODES.initial,
      currentModeRef: null
    };
  }
}
