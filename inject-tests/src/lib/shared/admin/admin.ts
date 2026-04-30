//#region imports
import { Taon } from 'taon/src';
import { TaonEntity, StringColumn } from 'taon/src';

import { User } from '../user/user';
//#endregion

@TaonEntity({
  className: 'Admin',
  createTable: true,
})
export class Admin extends User {
  //#region @websql
  @StringColumn()
  //#endregion
  permissions: string;
}
