import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Site} from "../../models/site";
import {Globals} from "../../services/globals";
import {ApiClient} from "../../services/ApiClient";
import {SitesPage} from "../sites/sites";

@Component({
  selector: 'page-site',
  templateUrl: 'site.html'
})
export class SitePage {
  public site: Site;

  /**
   *
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {Globals} globals
   * @param {ApiClient} client
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public globals: Globals, public client: ApiClient) {
    this.site = navParams.get('site');

  }

  /**
   *
   * @param {string} check
   */
  toggle(check: string) {
    if (this.site.getCheck(check).enabled) {
      this.site.getCheck(check).disable(this.client, this.globals);
    } else {
      this.site.getCheck(check).enable(this.client, this.globals);
    }
  }

  /**
   *
   */
  deleteSite() {
    this.globals.available_sites = this.globals.available_sites.filter((value) => value.id != this.site.id);
    this.site.delete(this.client, this.globals);
    this.globals.load(() => {
      this.navCtrl.setRoot(SitesPage);
    });
  }
}

