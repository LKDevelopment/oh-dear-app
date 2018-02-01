import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Check} from "../models/check";
import {Team} from "../models/User/team";
import {Site} from "../models/site";

@Injectable()
export class ApiClient {
  /**
   *
   * @param {HttpClient} client
   */
  constructor(public client: HttpClient) {

  }

  /**
   *
   * @param {string} api_key
   * @param callback
   */
  public getSites(api_key: string, callback) {
    this.client.get('https://proxy.lkdev.co/api/sites', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + api_key).set('Accept', 'application/json'),
    })
      .subscribe(
        data => callback(data)
      );
  }

  /**
   *
   * @param {string} api_key
   * @param callback
   */
  public getUser(api_key: string, callback) {
    this.client.get('https://proxy.lkdev.co/api/me', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + api_key).set('Accept', 'application/json'),
    })
      .subscribe(
        data => callback(data)
      );
  }

  /**
   *
   * @param {string} api_key
   * @param {Check} check
   * @param callback
   */
  public enableCheck(api_key: string, check: Check, callback) {
    this.client.post('https://proxy.lkdev.co/api/checks/' + check.id + '/enable', {}, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + api_key).set('Accept', 'application/json'),
    })
      .subscribe(
        data => callback(data)
      );
  }

  /**
   *
   * @param {string} api_key
   * @param {Check} check
   * @param callback
   */
  public disableCheck(api_key: string, check: Check, callback) {
    this.client.post('https://proxy.lkdev.co/api/checks/' + check.id + '/disable', {}, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + api_key).set('Accept', 'application/json'),
    })
      .subscribe(
        data => callback(data)
      );
  }

  /**
   *
   * @param {string} api_key
   * @param {Team} team
   * @param {string} url
   * @param success_callback
   * @param error_callback
   */
  public addSite(api_key: string, team: Team, url: string, success_callback, error_callback) {
    this.client.post('https://proxy.lkdev.co/api/sites', {url: url, team_id: team.id}, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + api_key).set('Accept', 'application/json'),
    }).subscribe(
      data => success_callback(data),
      (err: HttpErrorResponse) => error_callback(err)
    );
  }

  /**
   *
   * @param {string} api_key
   * @param {Site} site
   * @param success_callback
   * @param error_callback
   */
  public deleteSite(api_key: string, site: Site, success_callback, error_callback) {
    this.client.delete('https://proxy.lkdev.co/api/sites/' + site.id + '', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + api_key).set('Accept', 'application/json'),
    })
      .subscribe(
        data => success_callback(data),
        err => error_callback(err)
      );
  }
}

