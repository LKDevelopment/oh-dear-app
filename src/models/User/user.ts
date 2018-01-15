import {Team} from "./team";
import {Injectable} from '@angular/core';

@Injectable()
export class User {
  /**
   * "id": 1,
   "name": "Firstname Lastname",
   "email": "topsecret@email.tld",
   "photo_url": "https://www.gravatar.com/avatar/yourhash.jpg?s=200&d=mm",
   "teams": {
    "data": [
      {
        "id": 1,
        "name": "Team Awesome"
      }
    ]
  }
   */

  public id: number;
  public name: string;
  public email: string;
  public photo_url: string;
  public teams: Array<Team> = [];

  public setData(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.photo_url = data.photoUrl;
    this.parseTeams(data.teams);
  }

  public parseTeams(data) {
    data.data.attributes.forEach((value, key) => {
      var tmp = new Team();
      tmp.setData(value);
      this.teams.push(tmp);
    })
  }
}
