//#region imports
import { Taon } from 'taon/src';
import { _ } from 'tnp-core/src';

import { BobDefaultsValues } from './bob.defaults-values';
//#endregion

@Taon.Entity({
  className: 'Bob',
  createTable: true,
})
export class Bob extends Taon.Base.AbstractEntity<Bob> {
  //#region @websql
  @Taon.Orm.Column.String(BobDefaultsValues.description)
  //#endregion
  description?: string;

  //#region @websql
  @Taon.Orm.Column.DateTIme()
  //#endregion
  modificationDate?: string;
}