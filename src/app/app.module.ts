import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, Injectable, Injector, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {SitesPage} from '../pages/sites/sites';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpClientModule} from '@angular/common/http';
import {Globals} from "../services/globals";
import {Team} from "../models/User/team";
import {User} from "../models/User/user";
import {Site} from "../models/site";
import {Check} from "../models/check";

import {ApiClient} from "../services/ApiClient";
import {LoginModal} from "../pages/login/login";
import {IonicStorageModule} from "@ionic/storage";
import {SelectTeamModal} from "../pages/select-team/select-team";
import { Pro } from '@ionic/pro';
import {SitePage} from "../pages/site/site";
import {AddSiteModal} from "../pages/add-site/add-site";
import {MomentModule} from "angular2-moment";
import {LogoutModal} from "../pages/logout/logout";
const IonicPro = Pro.init('33a002bd', {
  appVersion: "0.0.1"
});
@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    IonicPro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SitesPage,
    LoginModal,
    SelectTeamModal,
    SitePage,
    AddSiteModal,
    LogoutModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SitesPage,
    LoginModal,
    SelectTeamModal,
    SitePage,
    AddSiteModal,
    LogoutModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    [{ provide: ErrorHandler, useClass: MyErrorHandler }],
    Globals,
    Team,
    User,
    Site,
    Check,
    ApiClient
  ]
})
export class AppModule {
}
