import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Check} from "../models/check";
import {Team} from "../models/User/team";

@Injectable()
export class ApiClient {

  constructor(public client: HttpClient) {

  }

  public getSites(callback) {
    this.client.get('https://proxy.lkdev.co/api/sites')
      .subscribe(
        data => callback(data),
        err => alert(err)
      );
  }

  public getUser(callback) {
    this.client.get('https://proxy.lkdev.co/api/me')
      .subscribe(
        data => callback(data),
        err => alert(err)
      );
  }

  public enableCheck(check: Check, callback) {
    this.client.post('https://proxy.lkdev.co/api/checks/' + check.id + '/enable', {})
      .subscribe(
        data => callback(data),
        err => alert(err)
      );
  }

  public disableCheck(check: Check, callback) {
    this.client.post('https://proxy.lkdev.co/api/checks/' + check.id + '/disable', {})
      .subscribe(
        data => callback(data),
        err => alert(err)
      );
  }

  public addSite(team: Team, url: string, success_callback, error_callback) {
    this.client.post('https://proxy.lkdev.co/api/sites', {url: url, team_id: team.id}).subscribe(
      data => success_callback(data),
      (err: HttpErrorResponse) => error_callback(err)
    );
  }
}

