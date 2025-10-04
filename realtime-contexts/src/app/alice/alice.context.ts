//#region imports
import { Taon, BaseContext } from 'taon/src';

import { HOST_CONFIG } from '../../app.hosts';
import { MIGRATIONS_CLASSES_FOR_AliceContext } from '../../migrations';

import { Alice } from './alice';
import { AliceController } from './alice.controller';
//#endregion

export const AliceContext = Taon.createContext(() => ({
  /**
   * import HOST_CONFIG from app.hosts.ts if config initialization is needed
   * HOST_CONFIG contains contextName and other crusial information for context
   * seemless integration with Taon CLI
   */
  ...HOST_CONFIG['AliceContext'],
  contextName: 'AliceContext', // not needed if using HOST_CONFIG object
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
    ...MIGRATIONS_CLASSES_FOR_AliceContext,
  },
  contexts: { BaseContext },
  entities: { Alice },
  controllers: { AliceController },
}));
