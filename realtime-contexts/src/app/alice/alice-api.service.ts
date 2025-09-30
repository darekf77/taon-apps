import { Injectable } from '@angular/core'; // @browser
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon } from 'taon/src';

import type { Alice } from './alice';
import { AliceController } from './alice.controller';

//#region @browser
@Injectable()
//#endregion
export class AliceApiService extends Taon.Base.AngularService {
  protected aliceController = this.injectController(AliceController);

  public get allMyEntities$(): Observable<Alice[]> {
    return this.aliceController
      .getAll()
      .request().observable.pipe(map(res => res.body.json));
  }
}