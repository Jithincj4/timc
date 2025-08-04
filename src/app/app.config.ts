import { provideHttpClient, HttpClient } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { createTranslateLoader } from "./app.translate-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TRANSLATE_HTTP_LOADER_CONFIG } from "@ngx-translate/http-loader";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter([]),
    provideAnimations(),
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        prefix: '/assets/i18n/',
        suffix: '.json',
      },
    },
    importProvidersFrom(
      BrowserModule, AppRoutingModule,
      TranslateModule.forRoot({
        fallbackLang: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),
    provideAnimations(),
  ]
};

