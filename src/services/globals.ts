import {Injectable} from '@angular/core';
import {Team} from "../models/User/team";
import {User} from "../models/User/user";
import {Site} from "../models/site";
import {ApiClient} from "./ApiClient";
import {NativeStorage} from "@ionic-native/native-storage";

@Injectable()
export class Globals {
  public api_key: string = null;
  public selected_team: Team;
  public user: User = null;

  public available_teams: Array<Team> = [];
  public available_sites: Array<Site> = [];

  constructor(public api: ApiClient, private nativeStorage: NativeStorage) {

  }

  public isAuthentificated() {
    this.loadFromStorage();
    return this.api_key !== null && this.user !== null;
  }

  public load() {
    this.api.getUser((data) => {
      var tmp = new User();
      tmp.setData(data);
      this.user = tmp;
    });
    this.api.getSites((data) => {
      data['data'].forEach((value, key) => {
        var tmp = new Site;
        tmp.setData(value);
        this.available_sites.push(tmp);
      });
    });
  }

  private loadFromStorage() {
    if (this.api_key == null) {
      this.nativeStorage.getItem('api_key')
        .then(
          data => this.api_key = data,
          error => console.error(error)
        );
    }
  }

  public saveApiKey(api_key) {
    this.api_key = api_key;
    this.nativeStorage.setItem('api_key', api_key)
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );

  }
}
