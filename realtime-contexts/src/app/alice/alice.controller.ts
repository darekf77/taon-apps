//#region imports
import { ContextsEndpointStorage } from 'taon/src';
import { Taon, ClassHelpers, EndpointContext } from 'taon/src';
import { _, CoreModels } from 'tnp-core/src';

import { Bob } from '../bob/bob';
import { BobContext, BobContextRemote } from '../bob/bob.context';

import { Alice } from './alice';

//#endregion

@Taon.Controller({
  className: 'AliceController',
})
export class AliceController extends Taon.Base.CrudController<Alice> {
  entityClassResolveFn: () => typeof Alice = () => Alice;

  async afterAllCtxInited(options: {
    ctxStorage: ContextsEndpointStorage;
  }): Promise<void> {
    super.afterAllCtxInited(options);
    console.log('helloWorld alice controller');

    const bobRemote = options.ctxStorage.getBy(BobContextRemote);
    bobRemote.realtimeClient
      .listenChangesCustomEvent('test')
      .subscribe(data => {
        console.log('alice got notified about bobRemote changes', data);
      });

    const bob = options.ctxStorage.getBy(BobContext);
    bob.realtimeClient.listenChangesCustomEvent('test').subscribe(data => {
      console.log('alice got notified about bob changes', data);
    });
  }

  // async afterAllCtxInited(): Promise<void> {
  //   console.log(_.kebabCase('helloWorld alice controller'));
  //   setTimeout(() => {
  //     console.log('triggering bob changes');
  //     all['BobContext'].
  //   }, 3000);
  // }

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
