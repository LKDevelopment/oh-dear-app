import {Component, ViewChild} from '@angular/core';
import {ModalController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {SitesPage} from '../pages/sites/sites';
import {Globals} from "../services/globals";
import {ApiClient} from "../services/ApiClient";
import {LoginModal} from "../pages/login/login";
import {SelectTeamModal} from "../pages/select-team/select-team";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, auth: boolean }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public globals: Globals, public modal: ModalController, public apiClient: ApiClient) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage, auth: false},
      {title: 'Sites', component: SitesPage, auth: false}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.globals.isAuthentificated() == false) {
        var login_modal = this.modal.create(LoginModal);
        login_modal.present();
      } else {

      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  isAuth(page) {
    return !page.auth;
  }

  selectTeamModal() {
    let modal = this.modal.create(SelectTeamModal);
    modal.present();
  }
}
