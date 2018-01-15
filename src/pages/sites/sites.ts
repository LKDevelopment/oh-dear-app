import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Site} from "../../models/site";
import {Globals} from "../../services/globals";
import {SitePage} from "../site/site";

@Component({
  selector: 'page-list',
  templateUrl: 'sites.html'
})
export class SitesPage {
  items: Array<Site>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globals: Globals) {
    // If we navigated to this page, we will have an item available as a nav param
    this.items = globals.available_sites;
  }

  openSite(site) {
    this.navCtrl.setRoot(SitePage, {site: site});
  }
}

