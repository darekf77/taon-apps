//#region imports
import { Taon, BaseContext } from 'taon/src';

import { HOST_CONFIG } from '../../app.hosts';
import {
  MIGRATIONS_CLASSES_FOR_AliceContext,
  MIGRATIONS_CLASSES_FOR_BobContext,
} from '../../migrations';

import { Bob } from './bob';
import { BobController } from './bob.controller';
//#endregion

export const BobContext = Taon.createContext(() => ({
  /**
   * import HOST_CONFIG from app.hosts.ts if config initialization is needed
   * HOST_CONFIG contains contextName and other crusial information for context
   * seemless integration with Taon CLI
   */
  ...HOST_CONFIG['BobContext'],
  contextName: 'BobContext', // not needed if using HOST_CONFIG object
  /**
   * set to false if you not going to initialize() this context independently
   * ( initialized context creates express server and database )
   */
  abstract: false,
  /**
   * database:true - if this context is going to use database
   */
  database: true,
  logs: {
    realtime: true,
    // framework: true,
  },
  migrations: {
    ...MIGRATIONS_CLASSES_FOR_BobContext,
  },
  contexts: { BaseContext },
  entities: { Bob },
  controllers: { BobController },
}));

export const BobContextRemote = BobContext.cloneAsRemote({
  overrideRemoteHost: HOST_CONFIG['BobContext'].host,
});
