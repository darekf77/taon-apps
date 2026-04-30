//#region imports
import { Taon } from 'taon/src';
import { TaonBaseCrudController, TaonController } from 'taon/src';
import { EntityOptions } from 'taon-typeorm/src';

import { Admin } from '../admin/admin';
import { AdminController } from '../admin/admin.controller';
import { SharedContext } from '../shared.context';
import { UserRepository } from '../user/user.repository';

import { Session } from './sesison';
//#endregion

@TaonController({
  className: 'SessionController',
})
export class SessionController extends TaonBaseCrudController<Session> {
  entityClassResolveFn = () => Session;

  userCustomRepo = this.injectCustomRepo(UserRepository);

  adminController = this.injectController(AdminController);

  sessionRepo = this.injectRepo(Session);

  async initExampleDbData(): Promise<any> {
    //#region @websql

    console.log('this.sessionCrud.getAll', this.sessionRepo.getAll);
    console.log(this.adminController.helloWorldFromAdmin);
    console.log('userCustomRepo', this.userCustomRepo.amCustomRepository);

    const session = new Session();
    session.timeout = 3999;
    await this.db.save(session);
    const session2 = new Session();
    session2.timeout = 234;
    await this.sessionRepo.save(session2 as any);

    const allSessions = await this.db.getAll();
    console.log('All sessions', allSessions);
    //#endregion
  }
}
