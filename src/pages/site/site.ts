import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Site} from "../../models/site";
import {Globals} from "../../services/globals";
import {ApiClient} from "../../services/ApiClient";

@Component({
  selector: 'page-site',
  templateUrl: 'site.html'
})
export class SitePage {
  public site: Site;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globals: Globals, public client: ApiClient) {
    this.site = navParams.get('site');

  }

  toggle(check) {
    if (this.site.getCheck(check).enabled) {
      this.site.getCheck(check).disable(this.client);
    } else {
      this.site.getCheck(check).enable(this.client);
    }
  }
}

