//#region imports
import { Taon, TaonBaseContext } from 'taon/src';

import { Email } from './email';
import { EmailController } from './email.controller';
import { EmailRepository } from './email.repository';
//#endregion

export const EmailContext = Taon.createContext(() => ({
  contextName: 'EmailContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { Email },
  controllers: { EmailController },
  repositories: { EmailRepository },
}));
