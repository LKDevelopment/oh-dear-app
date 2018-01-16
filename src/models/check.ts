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
  public globals: Globals;
  public constructor() {

  }

  public setData(data) {
    this.id = data.id;
    this.type = data.type;
    this.enabled = data.enabled;
  }

  public enable(client: ApiClient) {
    client.enableCheck(this.globals.api_key, this, (data) => {
      this.enabled = true;
    })
  }

  public disable(client: ApiClient) {
    client.disableCheck(this.globals.api_key, this, (data) => {
      this.enabled = false;
    })
  }
}
