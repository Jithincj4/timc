import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, NgxSonnerToaster],
})
export class AppComponent implements OnInit {
  title = 'FuFiConnect';

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.theme.update((theme) => ({
      ...theme,
      color: 'green',
      mode: 'light',
    }));
  }
}
