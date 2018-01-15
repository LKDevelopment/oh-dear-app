import {Injectable} from '@angular/core';
import {Team} from "../models/User/team";
import {User} from "../models/User/user";
import {Site} from "../models/site";
import {ApiClient} from "./ApiClient";
import {Storage} from "@ionic/storage";

@Injectable()
export class Globals {
  public api_key: string = null;
  public selected_team: Team = new Team();
  public user: User = null;
  public loaded_from_storage: boolean = false;
  public available_teams: Array<Team> = [];
  public available_sites: Array<Site> = [];

  constructor(public api: ApiClient, public storage: Storage) {

  }

  public isAuthentificated() {
    if (!this.loaded_from_storage) {
      this.loadFromStorage();
      this.loaded_from_storage = true;
    }
    //this.loadFromStorage();
    return this.api_key !== null && this.user !== null;
  }

  public load() {
    this.api.getUser((data) => {
      var tmp = new User();
      tmp.setData(data);
      this.user = tmp;
      this.available_teams = [];
      this.available_teams = this.user.teams;
    });
    this.api.getSites((data) => {
      this.available_sites = [];
      data['data'].forEach((value, key) => {
        var tmp = new Site;
        tmp.setData(value);
        this.available_sites.push(tmp);
      });
    });
  }

  public loadFromStorage() {
    if (this.api_key == null) {
      this.storage.get('api_key')
        .then(
          (data) => {
            if (data == undefined) {
              this.api_key = null;
            } else {
              this.api_key = data;
            }
          },
          error => console.error(error)
        );
    }
  }

  public saveApiKey(api_key) {
    this.api_key = api_key;
    this.storage.set('api_key', api_key);

  }
}
