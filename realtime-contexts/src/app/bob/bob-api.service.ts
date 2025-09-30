import { Injectable } from '@angular/core'; // @browser
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon } from 'taon/src';

import type { Bob } from './bob';
import { BobController } from './bob.controller';

//#region @browser
@Injectable()
//#endregion
export class BobApiService extends Taon.Base.AngularService {
  protected bobController = this.injectController(BobController);

  public get allMyEntities$(): Observable<Bob[]> {
    return this.bobController
      .getAll()
      .request().observable.pipe(map(res => res.body.json));
  }
}