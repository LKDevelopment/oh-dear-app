import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {Globals} from "../globals";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public api_key = '2JZ1jnfPfMrmwiyaQyLYftwWy8OW67DXsOCGW3eV2668vUN74wdSj5e5ZEt5';

  constructor() {
  }
  setApiKey(data){
    this.api_key = data;
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
