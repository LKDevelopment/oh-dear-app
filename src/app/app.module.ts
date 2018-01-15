import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
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

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../services/http/TokenInterceptor';
import {ApiClient} from "../services/ApiClient";
import {LoginModal} from "../pages/login/login";
import {IonicStorageModule} from "@ionic/storage";
import {SelectTeamModal} from "../pages/select-team/select-team";
import {NativeStorage} from "@ionic-native/native-storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SitesPage,
    LoginModal,
    SelectTeamModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SitesPage,
    LoginModal,
    SelectTeamModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    Globals,
    Team,
    User,
    Site,
    Check,
    ApiClient,
    NativeStorage
  ]
})
export class AppModule {
}
