import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Check} from "../models/check";
import {Team} from "../models/User/team";
import {Site} from "../models/site";

@Injectable()
export class ApiClient {

  constructor(public client: HttpClient) {

  }

  public getSites(api_key, callback) {
    this.client.get('https://proxy.lkdev.co/api/sites', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + api_key).set('Accept', 'application/json'),
    })
      .subscribe(
        data => callback(data),
        err => alert(err)
      );
  }

  public getUser(api_key, callback) {
    this.client.get('https://proxy.lkdev.co/api/me', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + api_key).set('Accept', 'application/json'),
    })
      .subscribe(
        data => callback(data),
        err => alert(err)
      );
  }

  public enableCheck(api_key, check: Check, callback) {
    this.client.post('https://proxy.lkdev.co/api/checks/' + check.id + '/enable', {}, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + api_key).set('Accept', 'application/json'),
    })
      .subscribe(
        data => callback(data),
        err => alert(err)
      );
  }

  public disableCheck(api_key, check: Check, callback) {
    this.client.post('https://proxy.lkdev.co/api/checks/' + check.id + '/disable', {}, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + api_key).set('Accept', 'application/json'),
    })
      .subscribe(
        data => callback(data),
        err => alert(err)
      );
  }

  public addSite(api_key, team: Team, url: string, success_callback, error_callback) {
    this.client.post('https://proxy.lkdev.co/api/sites', {url: url, team_id: team.id}, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + api_key).set('Accept', 'application/json'),
    }).subscribe(
      data => success_callback(data),
      (err: HttpErrorResponse) => error_callback(err)
    );
  }

  public deleteSite(api_key, site: Site, success_callback, error_callback) {
    this.client.delete('https://proxy.lkdev.co/api/sites/' + site.id + '', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + api_key).set('Accept', 'application/json'),
    })
      .subscribe(
        data => success_callback(data),
        err => error_callback(err)
      );
  }
}

