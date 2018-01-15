import {Component} from '@angular/core';
import {ModalController, NavController, ViewController} from 'ionic-angular';
import {Globals} from "../../services/globals";
import {SelectTeamModal} from "../select-team/select-team";

@Component({
  selector: 'modal-login',
  templateUrl: 'login.html'
})
export class LoginModal {
  public api_key: string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public globals: Globals, public modalCtrl: ModalController) {

  }

  login() {
    this.globals.saveApiKey(this.api_key);
    this.globals.load();
    this.viewCtrl.dismiss();
    let modal = this.modalCtrl.create(SelectTeamModal);
    modal.present();
  }
}
