import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {Globals} from "../globals";
import {Storage} from "@ionic/storage";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public api_key = '';

  constructor(storage:Storage) {
    storage.get('api_key').then((data) => {
      this.api_key = data;
    })
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.api_key}`,
        Accept: 'application/json'
      }
    });
    return next.handle(request);
  }
}
