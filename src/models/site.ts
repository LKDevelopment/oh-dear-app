import {Check} from "./check";
import {Injectable} from '@angular/core';
import {ApiClient} from "../services/ApiClient";
import {Globals} from "../services/globals";

@Injectable()
export class Site {
  /**
   * {
      "id": 2,
      "url": "https://yourothersite.tld",
      "sort_url": "yourothersite.tld",
      "team_id": 1,
      "latest_run_date": "2017-12-05 20:02:08",
      "summarized_check_result": "succeeded",
      "created_at": "20171108 07:40:16",
      "updated_at": "20171108 07:40:16",
      "checks": [
        {
          "id": 2,
          "type": "certificate_health",
          "enabled": true
        },
        {
          "id": 3,
          "type": "mixed_content",
          "enabled": true
        },
        {
          "id": 4,
          "type": "certificate_transparency",
          "enabled": true
        },
        {
          "id": 5,
          "type": "uptime",
          "enabled": true
        }
      ]
    }
   */
  public id: number;
  public url: string;
  public sort_url: string;
  public team_id: number;
  public latest_run_date: string;
  public summarized_check_result: string;
  public created_at: string;
  public updated_at: string;
  public checks: Array<Check> = [];
  public uptime_check: Check;
  public certificate_health_check: Check;
  public mixed_content_check: Check;
  public certificate_transparency_check: Check;


  public setData(data) {
    this.id = data.id;
    this.url = data.url;
    this.sort_url = data.sort_url;
    this.team_id = data.team_id;
    this.latest_run_date = data.latest_run_date;
    this.summarized_check_result = data.summarized_check_result;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.parseChecks(data.checks);
    this.uptime_check = this.getCheck('uptime');
    this.certificate_health_check = this.getCheck('certificate_health');
    this.mixed_content_check = this.getCheck('mixed_content');
    this.certificate_transparency_check = this.getCheck('certificate_transparency');
  }

  public delete(client: ApiClient, globals: Globals) {
    client.deleteSite(globals.api_key, this, (data) => {
    }, (data) => {

    })
  }

  public getCheck(type: string) {
    var tmp: Check = new Check();
    this.checks.forEach((value, key) => {
      if (value.type == type) {
        tmp = value;
      }
    });
    return tmp;
  }

  public parseChecks(data) {
    data.forEach((value, key) => {
      var tmp = new Check;
      tmp.setData(value);
      if(value.id != 0){
        this.checks.push(tmp);
      }
    });
  }
}
