import {Check} from "./check";
import { Injectable } from '@angular/core';
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
  public id:number;
  public url:string;
  public sort_url:string;
  public team_id:number;
  public latest_run_date:string;
  public summerized_check_result:string;
  public created_at:string;
  public updated_at:string;
  public checks: Array<Check>;

  public delete(){
    // TODO
  }
}
