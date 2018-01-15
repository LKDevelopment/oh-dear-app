import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ApiClient} from "../../services/ApiClient";
import {Site} from "../../models/site";
import {Globals} from "../../services/globals";

@Component({
  selector: 'page-list',
  templateUrl: 'sites.html'
})
export class SitesPage {
  items: Array<Site>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api_client: ApiClient, public globals: Globals) {
    // If we navigated to this page, we will have an item available as a nav param
    this.items = globals.available_sites;
  }
}

