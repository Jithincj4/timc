import { Component, OnInit, signal } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuService } from '../../services/menu.service';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [AngularSvgIconModule,RouterLink],
})
export class NavbarComponent implements OnInit {
  menus = signal<MenuItem[]>([]);
  

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
}
