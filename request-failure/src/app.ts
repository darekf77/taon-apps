//#region imports
import * as os from 'os'; // @backend

import { CommonModule } from '@angular/common'; // @browser
import { NgModule, inject, Injectable } from '@angular/core'; // @browser
import { Component, OnInit } from '@angular/core'; // @browser
import { VERSION } from '@angular/core'; // @browser
import Aura from '@primeng/themes/aura'; // @browser
import { MaterialCssVarsModule } from 'angular-material-css-vars'; // @browser
import { providePrimeNG } from 'primeng/config'; // @browser
import { Observable, map } from 'rxjs';
import {
  Taon,
  BaseContext,
  TAON_CONTEXT,
  EndpointContext,
  TaonHttpResponseError,
} from 'taon/src';
import { UtilsOs } from 'tnp-core/src';

import { HOST_CONFIG } from './app.hosts';
//#endregion

console.log('hello world');
console.log('Your backend host ' + HOST_CONFIG['MainContext'].host);
console.log('Your frontend host ' + HOST_CONFIG['MainContext'].frontendHost);

//#region request-failure component
//#region @browser
@Component({
  selector: 'app-request-failure',
  standalone: false,
  template: `hello from request-failure<br />
    Angular version: {{ angularVersion }}<br />
    <br />
    users from backend
    <ul>
      <li *ngFor="let user of users$ | async">{{ user | json }}</li>
    </ul>
    hello world from backend: <strong>{{ hello$ | async }}</strong>

    <button (click)="shortError()">shortError</button>
    <button (click)="stackError()">stackError</button>
    <button (click)="customCodeError()">customCodeError</button>
    <button (click)="taonError()">taonError</button>
    <button (click)="failInRow()">failInRow</button> `,
  styles: [
    `
      body {
        margin: 0px !important;
      }
    `,
  ],
})
export class RequestFailureComponent {
  angularVersion =
    VERSION.full +
    ` mode: ${UtilsOs.isRunningInWebSQL() ? ' (websql)' : '(normal)'}`;
  userApiService = inject(UserApiService);
  readonly users$: Observable<User[]> = this.userApiService.getAll();
  readonly hello$ = this.userApiService.userController
    .helloWorld()
    .request()
    .observable.pipe(map(r => r.body.text));

  async shortError() {
    // this.userApiService.userController.waitForFail();
    try {
      await this.userApiService.userController.helloWorld('short').request();
    } catch (error) {
      console.log(error);
    }
  }

  async stackError() {
    // this.userApiService.userController.waitForFail();
    try {
      await this.userApiService.userController.helloWorld('stack').request();
    } catch (error) {
      console.log(error);
    }
  }

  async customCodeError() {
    // this.userApiService.userController.waitForFail();
    try {
      await this.userApiService.userController
        .helloWorld('customCode')
        .request();
    } catch (error) {
      console.log(error);
    }
  }

  async taonError() {
    // this.userApiService.userController.waitForFail();
    try {
      await this.userApiService.userController
        .helloWorld('taonError')
        .request();
    } catch (error) {
      console.log(error);
    }
  }

  async failInRow() {
    this.userApiService.userController.waitForFail();
  }
}
//#endregion
//#endregion

//#region  request-failure api service
//#region @browser
@Injectable({
  providedIn: 'root',
})
export class UserApiService extends Taon.Base.AngularService {
  userController = this.injectController(UserController);
  getAll(): Observable<User[]> {
    return this.userController
      .getAll()
      .request()
      .observable.pipe(map(r => r.body.json));
  }
}
//#endregion
//#endregion

//#region  request-failure module
//#region @browser
@NgModule({
  providers: [
    {
      provide: TAON_CONTEXT,
      useFactory: () => MainContext,
    },
    providePrimeNG({
      // inited ng prime - remove if not needed
      theme: {
        preset: Aura,
      },
    }),
  ],
  exports: [RequestFailureComponent],
  imports: [
    CommonModule,
    MaterialCssVarsModule.forRoot({
      // inited angular material - remove if not needed
      primary: '#4758b8',
      accent: '#fedfdd',
    }),
  ],
  declarations: [RequestFailureComponent],
})
export class RequestFailureModule {}
//#endregion
//#endregion

//#region  request-failure entity
@Taon.Entity({ className: 'User' })
class User extends Taon.Base.AbstractEntity {
  //#region @websql
  @Taon.Orm.Column.String()
  //#endregion
  name?: string;

  getHello(): string {
    return `hello ${this.name}`;
  }
}
//#endregion

//#region  request-failure controller
@Taon.Controller({ className: 'UserController' })
class UserController extends Taon.Base.CrudController<User> {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  entityClassResolveFn = () => User;

  count = 0;

  async waitForFail(): Promise<void> {
    await this._waitForProperStatusChange<string>({
      actionName: 'helloWorld',
      poolingInterval: 500,
      request: ({ reqIndexNum }) => {
        console.log(`Making request #${reqIndexNum}`);

        if (reqIndexNum > 5) {
          return this.helloWorld('customCode').request();
        }
        if (reqIndexNum > 4) {
          return this.helloWorld('stack').request();
        }
        if (reqIndexNum > 3) {
          return this.helloWorld('short').request();
        }

        return this.helloWorld().request();
      },
      statusCheck: response => response.body.text === 'hello world niga',
      actionOnBackendError: ({ errorData, reqIndexNum }) => {
        if (errorData instanceof TaonHttpResponseError) {
          console.warn(errorData.body.json);
        }
        console.log({ errorData, reqIndexNum });
        return reqIndexNum < 6;
      },
    });
  }

  @Taon.Http.GET()
  helloWorld(
    @Taon.Http.Param.Query('errorType')
    errorType?: 'short' | 'stack' | 'customCode' | 'taonError',
  ): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      if (errorType === 'short') {
        throw 'short error message here';
      }
      if (errorType === 'stack') {
        throw new Error('message with stack trace here');
      }
      if (errorType === 'customCode') {
        res.status(444).json({ customErrorMessage: 'Helo my friend' });
        return;
      }
      if (errorType === 'taonError') {
        Taon.error({
          message: 'This is custom Taon error',
          status: 499,
        });
      }
      return `hello world`;
    };
    //#endregion
  }

  @Taon.Http.GET()
  getOsPlatform(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      //#region @backend
      return os.platform(); // for normal nodejs backend return real value
      //#endregion
      return 'no-platform-inside-browser-and-websql-mode';
    };
    //#endregion
  }
}
//#endregion

//#region  request-failure migration
//#region @websql
@Taon.Migration({
  className: 'UserMigration',
})
class UserMigration extends Taon.Base.Migration {
  userController = this.injectRepo(User);
  async up(): Promise<any> {
    const superAdmin = new User();
    superAdmin.name = 'super-admin';
    await this.userController.save(superAdmin);
  }
}
//#endregion
//#endregion

//#region  request-failure context
var MainContext = Taon.createContext(() => ({
  ...HOST_CONFIG['MainContext'],
  contexts: { BaseContext },
  //#region @websql
  /**
   * This is dummy migration - you DO NOT NEED need this migrations object
   * if you are using HOST_CONFIG['MainContext'] that contains 'migrations' object.
   * DELETE THIS 'migrations' object if you use taon CLI that generates
   * migrations automatically inside /src/migrations folder.
   */
  migrations: {
    UserMigration,
  },
  //#endregion
  controllers: {
    UserController,
  },
  entities: {
    User,
  },
  database: true,
  // disabledRealtime: true,
}));
//#endregion

async function start(startParams?: Taon.StartParams): Promise<void> {
  await MainContext.initialize();

  //#region @backend
  if (
    startParams.onlyMigrationRun ||
    startParams.onlyMigrationRevertToTimestamp
  ) {
    process.exit(0);
  }
  //#endregion

  //#region @backend
  console.log(`Hello in NodeJs backend! os=${os.platform()}`);
  //#endregion
}

export default start;
