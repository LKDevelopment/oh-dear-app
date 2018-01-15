import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Site} from "../../models/site";
import {Globals} from "../../services/globals";

@Component({
  selector: 'page-site',
  templateUrl: 'site.html'
})
export class SitePage {
public site: Site;
  constructor(public navCtrl: NavController, public navParams: NavParams, public globals: Globals) {
   this.site = navParams.get('site');

  }
}

