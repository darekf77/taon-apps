//#region imports
import { Taon } from 'taon/src';
import {
  TaonBaseEntity,
  TaonEntity,
  PrimaryGeneratedColumn,
  Generated,
  NumberColumn,
} from 'taon/src';
//#endregion

@TaonEntity({
  className: 'Session',
})
export class Session extends TaonBaseEntity {
  //#region @websql
  @PrimaryGeneratedColumn()
  //#endregion
  id: string;

  //#region @websql
  @NumberColumn()
  //#endregion
  timeout: number;
}
