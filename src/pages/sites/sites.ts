import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {Site} from "../../models/site";
import {Globals} from "../../services/globals";
import {SitePage} from "../site/site";
import {AddSiteModal} from "../add-site/add-site";

@Component({
  selector: 'page-list',
  templateUrl: 'sites.html'
})
export class SitesPage {
  items: Array<Site>;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public globals: Globals, public modalCtrl: ModalController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.items = globals.available_sites;
  }

  openSite(site) {
    this.navCtrl.push(SitePage, {site: site});
  }

  openAddAnotherPage() {
    var modal = this.modalCtrl.create(AddSiteModal);
    modal.present();
  }

  reloadData() {
    let spinner = this.loadingCtrl.create();
    spinner.present();
    this.globals.load(() => {
      spinner.dismiss();
    })
  }
}

