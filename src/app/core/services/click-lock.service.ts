import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClickLockService {
  private lockedButtons = new Set<string>();

  isLocked(key: string): boolean {
    return this.lockedButtons.has(key);
  }

  lock(key: string) {
    this.lockedButtons.add(key);
  }

  unlock(key: string) {
    this.lockedButtons.delete(key);
  }
}
