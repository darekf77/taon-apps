//#region imports
import { Taon, ClassHelpers } from 'taon/src';
import { GET, Query, TaonBaseCrudController, TaonController } from 'taon/src';
import { _ } from 'tnp-core/src';

import { Email } from './email';

//#endregion

@TaonController({
  className: 'EmailController',
})
export class EmailController extends TaonBaseCrudController<Email> {
  entityClassResolveFn: () => typeof Email = () => Email;

  //#region methods & getters / hello world
  @GET()
  helloWord(@Query('yourName') yourName: string): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      const numOfEntities = await this.db.count();
      return (
        `Hello ${yourName || 'world'} from ${ClassHelpers} ` +
        `controller..  ${numOfEntities} entites in db..`
      );
    };
    //#endregion
  }
  //#endregion
}
