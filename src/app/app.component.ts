import {Component, ViewChild} from '@angular/core';
import {ModalController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {SitesPage} from '../pages/sites/sites';
import {Globals} from "../services/globals";
import {Storage} from "@ionic/storage";
import {LoginModal} from "../pages/login/login";
import {SelectTeamModal} from "../pages/select-team/select-team";
import {LogoutModal} from "../pages/logout/logout";
import {Network} from "@ionic-native/network";
import {ErrorModal} from "../pages/error/error";
import {AppVersion} from "@ionic-native/app-version";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, auth: boolean }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public globals: Globals, public modal: ModalController, public storage: Storage, public network: Network, public appVersion: AppVersion) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage, auth: false},
      {title: 'Sites', component: SitesPage, auth: false}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // watch network for a disconnect
      this.network.onDisconnect().subscribe(() => {
        this.modal.create(ErrorModal).present();
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.styleDefault();
      this.appVersion.getVersionNumber().then((version) => {
        if (version == undefined || version.length == 0) {
          this.globals.app_version = 'DEV BUILD';
        } else {
          this.globals.app_version = version;
        }
      });
      this.storage.ready().then(() => {
        this.globals.loadFromStorage(() => {
          if (this.globals.isAuthentificated() == false) {
            if (this.globals.api_key == null) {
              var login_modal = this.modal.create(LoginModal);
              login_modal.present();
            } else if (this.globals.selected_team.id == 0) {
              var select_team_modal = this.modal.create(SelectTeamModal);
              select_team_modal.present()
            }
          } else {

          }
          this.splashScreen.hide();
        });
      });


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

  logoutModal() {
    let modal = this.modal.create(LogoutModal);
    modal.present();
  }

  loginInPage() {
    this.modal.create(LoginModal).present();
  }
}
