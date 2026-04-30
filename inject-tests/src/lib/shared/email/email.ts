//#region imports
import { Taon } from 'taon/src';
import { TaonBaseAbstractEntity, TaonEntity, StringColumn } from 'taon/src';
import { _ } from 'tnp-core/src';

import { EmailDefaultsValues } from './email.defaults-values';

//#endregion

@TaonEntity({
  className: 'Email',
  createTable: true,
})
export class Email extends TaonBaseAbstractEntity<Email> {
  //#region @websql
  @StringColumn()
  //#endregion
  address?: string;
}
