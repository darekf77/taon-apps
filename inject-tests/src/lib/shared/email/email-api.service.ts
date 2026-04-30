//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon } from 'taon/src';
import { TaonBaseAngularService } from 'taon/src';

import type { Email } from './email';
import { EmailController } from './email.controller';
//#endregion

@Injectable()
export class EmailApiService extends TaonBaseAngularService {
  private emailController = this.injectController(EmailController);

  public get allMyEntities$(): Observable<Email[]> {
    return this.emailController.getAll().request!().observable.pipe(
      map(res => res.body.json),
    );
  }
}
