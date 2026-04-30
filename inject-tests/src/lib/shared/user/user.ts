//#region imports
import { Taon } from 'taon/src';
import {
  TaonBaseEntity,
  TaonEntity,
  PrimaryGeneratedColumn,
  Generated,
  StringColumn,
} from 'taon/src';
//#endregion

@TaonEntity({
  className: 'User',
  createTable: true,
})
export class User extends TaonBaseEntity {
  //#region @websql
  @PrimaryGeneratedColumn()
  //#endregion
  id: string;

  //#region @websql
  @StringColumn()
  //#endregion
  name: string;

  //#region @websql
  @StringColumn()
  //#endregion
  email: string;

  //#region @websql
  @StringColumn()
  //#endregion
  password: string;

  //#region @websql
  @StringColumn()
  //#endregion
  theme: string;
}
