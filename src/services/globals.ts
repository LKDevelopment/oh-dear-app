import {Injectable} from '@angular/core';
import {Team} from "../models/User/team";
@Injectable()
export class Globals {
  public selected_team: Team;
}
