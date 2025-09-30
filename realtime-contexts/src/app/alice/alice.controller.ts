//#region imports
import { Taon, ClassHelpers, EndpointContext } from 'taon/src';
import { _ } from 'tnp-core/src';

import { Bob } from '../bob/bob';

import { Alice } from './alice';
//#endregion

@Taon.Controller({
  className: 'AliceController',
})
export class AliceController extends Taon.Base.CrudController<Alice> {
  entityClassResolveFn: () => typeof Alice = () => Alice;

  async afterAllCtxInited(allContexts?: {
    [contextName: string]: EndpointContext;
  }): Promise<void> {
    console.log(_.kebabCase('helloWorld alice controller'));

    allContexts['BobContext'].realtimeClient
      .listenChangesCustomEvent('test')
      .subscribe(data => {
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
