import {Injectable} from '@angular/core';

@Injectable()
export class Team {
  /**
   * {
        "id": 1,
        "name": "Team Awesome"
      }
   */

  public id: number = 0;
  public name: string = '';

  public setData(data) {
    this.id = data.id;
    this.name = data.name;
  }
}
