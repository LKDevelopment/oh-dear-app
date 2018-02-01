import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, ViewController} from 'ionic-angular';
import {Globals} from "../../services/globals";
import {ApiClient} from "../../services/ApiClient";
import {SitesPage} from "../sites/sites";

@Component({
  selector: 'modal-login',
  templateUrl: 'add-site.html'
})
export class AddSiteModal {
  public url: string;
  public error: string = null;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public globals: Globals, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public client: ApiClient) {
    this.error = null;
  }

  /**
   *
   */
  close(){
    this.error = null;
    this.viewCtrl.dismiss();
  }

  /**
   *
   */
  add() {
    this.error = null;
    let spinner = this.loadingCtrl.create();
    spinner.present();
    this.client.addSite(this.globals.api_key, this.globals.selected_team, this.url, (data) => {
      if (data['message'] != undefined) {
        spinner.dismiss();
        this.error = data['message'];
      } else {
        this.globals.load(() => {
          this.viewCtrl.dismiss();
          spinner.dismiss();
          this.globals.load(() => {
            this.navCtrl.setRoot(SitesPage);
          });

        });
      }
    }, (error) => {
      if (error.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        this.error = error.error.message;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        this.error = `Backend returned code ${error.status}, body was: ${error.error}`;
      }
    });

  }
}
