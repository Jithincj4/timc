import { Component, inject, OnInit, signal } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuService } from '../../services/menu.service';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from 'src/app/core/state/auth.store.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [AngularSvgIconModule,RouterLink],
})
export class NavbarComponent implements OnInit {
  menus = signal<MenuItem[]>([]);
  auth=inject(AuthStore);
  

  constructor(public menuService: MenuService) {}

  ngOnInit(): void {
    this.menus.set(this.menuService.pagesMenu);
  }

  toggleMobileMenu(): void {
    this.menuService.showMobileMenu = !this.menuService.showMobileMenu;
  }

  closeMobileMenu(): void {
    this.menuService.showMobileMenu = false;
  }
  logout(): void {
    this.menuService.logout();
  }
}
