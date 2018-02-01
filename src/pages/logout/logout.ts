import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, ViewController} from 'ionic-angular';
import {Globals} from "../../services/globals";
import {Storage} from "@ionic/storage";
import {Team} from "../../models/User/team";
import {LoginModal} from "../login/login";

@Component({
  selector: 'page-modal',
  templateUrl: 'logout.html'
})
export class LogoutModal {


  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public globals: Globals, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public storage: Storage) {

  }

  /**
   *
   */
  logout() {
    let spinner = this.loadingCtrl.create();
    spinner.present();
    this.storage.remove('api_key');
    this.globals.api_key = null;
    this.globals.user = null;
    this.storage.remove('selected_team');
    this.globals.selected_team = new Team();
    spinner.dismiss();
    this.viewCtrl.dismiss();
    var modal = this.modalCtrl.create(LoginModal);
    modal.present();
  }
}
