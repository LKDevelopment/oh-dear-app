import {Component} from '@angular/core';
import {LoadingController, NavController, ViewController} from 'ionic-angular';
import {Globals} from "../../services/globals";
import {Team} from "../../models/User/team";

@Component({
  selector: 'modal-select-team',
  templateUrl: 'select-team.html'
})
export class SelectTeamModal {
  public selected_team: Team;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public globals: Globals, public loadingCtrl: LoadingController) {
    this.selected_team = globals.selected_team;
  }

  /**
   *
   */
  select() {
    let spinner = this.loadingCtrl.create();
    spinner.present();
    this.globals.setSelectedTeam(this.selected_team);
    this.globals.load(() => {
      spinner.dismiss();
      this.viewCtrl.dismiss();
    });


  }
}
