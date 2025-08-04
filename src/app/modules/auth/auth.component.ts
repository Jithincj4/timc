import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [AngularSvgIconModule, RouterOutlet],
})
export class AuthComponent implements OnInit {
  constructor() {}

  private translate= inject(TranslateService); 
  selectedLang = 'en';
  ngOnInit(): void {}
  changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.selectedLang = lang;
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }
}
