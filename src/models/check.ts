import {Injectable} from '@angular/core';
import {ApiClient} from "../services/ApiClient";
import {Globals} from "../services/globals";

@Injectable()
export class Check {
  /**
   *  {
          "id": 2,
          "type": "certificate_health",
          "enabled": true
        },
   */
  public id: number;
  public type: string;
  public enabled: boolean;
  public constructor() {

  }

  public setData(data) {
    this.id = data.id;
    this.type = data.type;
    this.enabled = data.enabled;
  }

  public enable(client: ApiClient, globals:Globals) {
    client.enableCheck(globals.api_key, this, (data) => {
      this.enabled = true;
    })
  }

  public disable(client: ApiClient, globals:Globals) {
    client.disableCheck(globals.api_key, this, (data) => {
      this.enabled = false;
    })
  }
}
