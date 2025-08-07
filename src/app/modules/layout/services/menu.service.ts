import { Injectable, OnDestroy, signal, effect } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/core/constants/menu';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService implements OnDestroy {
  private _showSidebar = signal(false);
  private _showMobileMenu = signal(false);
  private _pagesMenu = signal<MenuItem[]>([]);
  private _subscription = new Subscription();

  constructor(private router: Router) {
    /** Set dynamic menu */
    this._pagesMenu.set(Menu.adminPages);

    // Initialize sidebar state based on screen size
    this.initializeSidebarState();

    // Listen to window resize events
    if (typeof window !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        this.handleScreenResize();
      });
      resizeObserver.observe(document.body);
    }

    let sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        /** Expand menu base on active route */
        this._pagesMenu().forEach((menu) => {
          let activeGroup = false;
          menu.items.forEach((subMenu) => {
            const active = this.isActive(subMenu.route);
            subMenu.expanded = active;
            subMenu.active = active;
            if (active) activeGroup = true;
            if (subMenu.children) {
              this.expand(subMenu.children);
            }
          });
          menu.active = activeGroup;
        });
      }
    });
    this._subscription.add(sub);
  }

  private initializeSidebarState(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sidebarState');
      if (stored) {
        this._showSidebar.set(false); // Force sidebar to be hidden regardless of stored state
      } else {
        // Default to hidden
        this._showSidebar.set(false);
      }
    }
  }

  private handleScreenResize(): void {
    if (typeof window !== 'undefined') {
      const isLargeScreen = window.innerWidth >= 1280;
      // Auto-collapse on smaller screens, but respect user preference on large screens
      if (window.innerWidth < 1024) {
        this._showSidebar.set(false);
      } else if (isLargeScreen && !this._showSidebar()) {
        // Optional: Auto-expand on very large screens
        // this._showSidebar.set(true);
      }
    }
  }

  get showSideBar() {
    return this._showSidebar();
  }
  get showMobileMenu() {
    return this._showMobileMenu();
  }
  get pagesMenu() {
    return this._pagesMenu();
  }

  set showSideBar(value: boolean) {
    this._showSidebar.set(value);
  }
  set showMobileMenu(value: boolean) {
    this._showMobileMenu.set(value);
  }

  public toggleSidebar() {
    const newState = !this._showSidebar();
    this._showSidebar.set(newState);
    
    // Persist sidebar state
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarState', JSON.stringify(newState));
    }
  }

  public toggleMenu(menu: SubMenuItem) {
    this.showSideBar = true;

    /** collapse all submenus except the selected one. */
    const updatedMenu = this._pagesMenu().map((menuGroup) => {
      return {
        ...menuGroup,
        items: menuGroup.items.map((item) => {
          return {
            ...item,
            expanded: item === menu ? !item.expanded : false,
          };
        }),
      };
    });

    this._pagesMenu.set(updatedMenu);
  }

  public toggleSubMenu(submenu: SubMenuItem) {
    submenu.expanded = !submenu.expanded;
  }

  private expand(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = this.isActive(item.route);
      if (item.children) this.expand(item.children);
    });
  }

  public isActive(instruction: any): boolean {
    return this.router.isActive(this.router.createUrlTree([instruction]), {
      paths: 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
