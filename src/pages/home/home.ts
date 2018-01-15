import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Globals} from "../../services/globals";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public globals: Globals) {

  }

}
