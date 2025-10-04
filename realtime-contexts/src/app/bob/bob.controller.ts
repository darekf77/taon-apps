//#region imports
import { Taon, ClassHelpers, EndpointContext } from 'taon/src';
import { ContextsEndpointStorage } from 'taon/src';
import { _, CoreModels } from 'tnp-core/src';

import { Bob } from './bob';
import { BobContext } from './bob.context';
//#endregion

@Taon.Controller({
  className: 'BobController',
})
export class BobController extends Taon.Base.CrudController<Bob> {
  entityClassResolveFn: () => typeof Bob = () => Bob;

  async afterAllCtxInited(options: {
    ctxStorage: ContextsEndpointStorage;
  }): Promise<void> {
    super.afterAllCtxInited(options);

    setTimeout(async () => {
      console.log('triggering bob changes');
      options.ctxStorage
        .getBy(BobContext)
        .realtimeServer.triggerCustomEvent('test', {
          heloAlice: 123,
        });
    }, 3000);
  }

  //#region methods & getters / hello world
  @Taon.Http.GET()
  helloWord(
    @Taon.Http.Param.Query('yourName') yourName: string,
  ): Taon.Response<string> {
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
