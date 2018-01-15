import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {Globals} from "../../services/globals";
import {Team} from "../../models/User/team";

@Component({
  selector: 'modal-select-team',
  templateUrl: 'select-team.html'
})
export class SelectTeamModal {
  public selected_team: Team;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public globals: Globals) {
    this.selected_team = globals.selected_team;
  }

  select() {
    console.log(this.selected_team);
    this.globals.selected_team = this.selected_team;
    this.globals.load();
    this.viewCtrl.dismiss();

  }
}
