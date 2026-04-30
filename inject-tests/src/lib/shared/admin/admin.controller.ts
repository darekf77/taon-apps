//#region imports
import { ClassHelpers, Taon } from 'taon/src';
import { TaonController } from 'taon/src';

import { SharedContext } from '../shared.context';
import { User } from '../user/user';
import { UserController } from '../user/user.controller';

import { Admin } from './admin';
//#endregion

@TaonController({
  className: 'AdminController',
})
export class AdminController extends UserController {
  entityClassResolveFn = () => Admin;

  helloWorldFromAdmin = 'hello world from admin';

  async initExampleDbData(): Promise<any> {
    //#region @websqlFunc
    //#endregion
  }
}
