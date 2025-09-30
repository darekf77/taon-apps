//#region imports
import { Taon } from 'taon/src';
import { _ } from 'tnp-core/src';

import { AliceDefaultsValues } from './alice.defaults-values';
//#endregion

@Taon.Entity({
  className: 'Alice',
  createTable: true,
})
export class Alice extends Taon.Base.AbstractEntity<Alice> {
  //#region @websql
  @Taon.Orm.Column.String(AliceDefaultsValues.description)
  //#endregion
  description?: string;

  //#region @websql
  @Taon.Orm.Column.DateTIme()
  //#endregion
  modificationDate?: string;
}