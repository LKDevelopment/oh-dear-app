import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiClient {

  constructor(public client: HttpClient) {

  }

  public getSites(callback) {
    this.client.get('/api/sites')
      .subscribe(
        data => callback(data),
        err => alert(err)
      );
  }

  public getUser(callback) {
    this.client.get('/api/me')
      .subscribe(
        data => callback(data),
        err => alert(err)
      );
  }
}

