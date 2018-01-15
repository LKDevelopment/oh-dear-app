import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Site} from "../models/site";

@Injectable()
export class ApiClient {

  constructor(public client: HttpClient) {

  }

  public getSites() {
    var sites: Array<Site>;
    this.client.get('https://ohdearapp.com/api/sites')
      .subscribe(
        (data) => {
          data['data'].forEach(function (value, key) {
            sites.push(value);
          });
        },
        err => alert(err.error)
      );
    return sites;
  }
}

