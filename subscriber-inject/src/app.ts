//#region imports
//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriberInjectComponent } from './app/user.component';
export { SubscriberInjectModule } from './app/user.module';
//#endregion
import { Taon } from 'taon/src';
import { AppContext } from './app.context';
import { UserController } from './app/user.controller';
import { UserSubscriber } from './app/user.subscriber';
//#endregion

async function start() {
  await AppContext.initialize();

  if (Taon.isBrowser) {
    const userController = AppContext.getClassInstance(UserController);
    const users = (await userController.getAll().request()).body?.json;
    console.log({
      'users from backend': users,
    });

    const userSubscriber = AppContext.getClassInstance(UserSubscriber);
    const notifySubscriber = () => {
      userSubscriber.customEvent();
      setTimeout(() => {
        notifySubscriber();
      }, 4000);
    };
    notifySubscriber();
  }
}

export default start;

//#region  subscriber-inject component
//#region @browser
@Component({
  standalone: false,
  template: ` hello world fromr subscriber-inject `,
})
export class SubscriberInjectComponent {}
//#endregion
//#endregion

//#region  subscriber-inject module
//#region @browser
@NgModule({
  declarations: [SubscriberInjectComponent],
  imports: [CommonModule],
  exports: [SubscriberInjectComponent],
})
export class SubscriberInjectModule {}
//#endregion
//#endregion
