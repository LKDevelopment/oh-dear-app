import {Injectable} from '@angular/core';
import {Team} from "../models/User/team";
import {User} from "../models/User/user";
import {Site} from "../models/site";
import {ApiClient} from "./ApiClient";
import {Storage} from "@ionic/storage";
import {LoadingController} from "ionic-angular";

@Injectable()
export class Globals {
  public api_key: string = null;
  public selected_team: Team = new Team();
  public user: User = null;
  public loaded_from_storage: boolean = false;
  public available_teams: Array<Team> = [];
  public available_sites: Array<Site> = [];
  public app_version: string = 'DEV BUILD';
  public loader = null;

  /**
   *
   * @param {ApiClient} api
   * @param {Storage} storage
   * @param {LoadingController} loadCtrl
   */
  constructor(public api: ApiClient, public storage: Storage, public loadCtrl: LoadingController) {

  }

  /**
   *
   * @returns {boolean}
   */
  public isAuthentificated() {
    if (!this.loaded_from_storage) {
      this.loadFromStorage(() => {
      });
      this.loaded_from_storage = true;
    }
    //this.loadFromStorage();
    return this.api_key !== null && this.user !== null;
  }

  /**
   *
   * @param {callback} callback_on_success
   */
  public load(callback_on_success) {

    this.api.getUser(this.api_key, (data) => {
      var tmp = new User();
      tmp.setData(data);
      this.user = tmp;
      this.available_teams = [];
      this.available_teams = this.user.teams;
    });
    this.api.getSites(this.api_key, (_data) => {
      this.available_sites = [];
      if (_data != undefined && _data['data'] != undefined) {
        _data['data'].forEach((value, key) => {
          var tmp = new Site;
          tmp.setData(value);
          this.available_sites.push(tmp);
        });
      }
    });
    callback_on_success();
  }

  /**
   *
   * @param {callback} callback
   */
  public loadFromStorage(callback) {
    if (this.api_key == null) {
      this.storage.get('api_key')
        .then(
          (data) => {
            if (data == undefined) {
              this.api_key = null;
            } else {
              this.api_key = data;
              this.load(() => {
              });
              if (this.selected_team.id == 0) {
                this.storage.get('selected_team')
                  .then(
                    (data) => {
                      if (data == undefined) {
                        this.selected_team = new Team();
                      } else {
                        this.selected_team = data;
                      }
                      callback();
                    },
                    error => console.error(error)
                  );
              }
            }
          },
          error => console.error(error)
        );
    }
    /*if (this.selected_team.id == 0) {
      this.storage.get('selected_team')
        .then(
          (data) => {
            if (data == undefined) {
              this.selected_team = new Team();
            } else {
              this.selected_team = data;
            }
          },
          error => console.error(error)
        );
    } */

  }

  /**
   *
   * @param {Team} team
   */
  public setSelectedTeam(team: Team) {
    this.selected_team = team;
    this.storage.set('selected_team', team);
  }

  /**
   *
   * @param {string} api_key
   */
  public saveApiKey(api_key: string) {
    this.api_key = api_key;
    this.storage.set('api_key', api_key);
  }

}
