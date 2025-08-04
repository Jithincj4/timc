import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Custom loader that fixes the type mismatch
export class CustomTranslateLoader extends TranslateHttpLoader {
  constructor(
    http: HttpClient,
    public prefix: string = './assets/i18n/',
    public suffix: string = '.json'
  ) {
    super();
  }

  override getTranslation(lang: string): Observable<TranslationObject> {
    return super.getTranslation(lang) as Observable<TranslationObject>;
  }
}

// Factory function for the custom loader
export function createTranslateLoader(http: HttpClient) {
  return new CustomTranslateLoader(http);
}