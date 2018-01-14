import { Injectable } from '@angular/core';
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

  public enable(){
    // TODO
  }

  public disable(){
    // TODO
  }
}
