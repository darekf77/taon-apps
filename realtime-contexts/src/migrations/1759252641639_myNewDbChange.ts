import { Taon } from 'taon/src';
import { QueryRunner } from 'taon-typeorm/src';

import { Alice } from '../app/alice/alice';
import { Bob } from '../app/bob';

//#region Migration class for context "AliceContext"
@Taon.Migration({
  className: 'AliceContext_1759252641639_myNewDbChange',
})
export class AliceContext_1759252641639_myNewDbChange extends Taon.Base
  .Migration {
  aliceRepo = this.injectRepo(Alice);

  //#region is migration for context AliceContext ready to run
  /**
   * IMPORTANT !!!
   * remove this method if you are ready to run this migration
   */
  public isReadyToRun(): boolean {
    return true;
  }
  //#endregion

  //#region up
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.startTransaction();
    try {
      // do "something" in db
      console.log('Running migration for AliceContext');
      await this.aliceRepo.save(
        new Alice().clone({ description: 'alice-in-migration' }),
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error('Error in migration:', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  //#endregion

  //#region down
  async down(queryRunner: QueryRunner): Promise<any> {
    // revert this "something" in db
    // await queryRunner.clearDatabase()
  }
  //#endregion
}
//#endregion

//#region Migration class for context "BobContext"
@Taon.Migration({
  className: 'BobContext_1759252641639_myNewDbChange',
})
export class BobContext_1759252641639_myNewDbChange extends Taon.Base
  .Migration {
  bobRepo = this.injectRepo(Bob);

  //#region is migration for context BobContext ready to run
  /**
   * IMPORTANT !!!
   * remove this method if you are ready to run this migration
   */
  public isReadyToRun(): boolean {
    return true;
  }
  //#endregion

  //#region up
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.startTransaction();
    try {
      // do "something" in db
      await this.bobRepo.save(
        new Bob().clone({ description: 'bob-in-migration' }),
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error('Error in migration:', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  //#endregion

  //#region down
  async down(queryRunner: QueryRunner): Promise<any> {
    // revert this "something" in db
    // await queryRunner.clearDatabase()
  }
  //#endregion
}
//#endregion

//#region Migration class for context "MainContext"
@Taon.Migration({
  className: 'MainContext_1759252641639_myNewDbChange',
})
export class MainContext_1759252641639_myNewDbChange extends Taon.Base
  .Migration {
  //#region is migration for context MainContext ready to run
  /**
   * IMPORTANT !!!
   * remove this method if you are ready to run this migration
   */
  public isReadyToRun(): boolean {
    return false;
  }
  //#endregion

  //#region up
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.startTransaction();
    try {
      // do "something" in db

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error('Error in migration:', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  //#endregion

  //#region down
  async down(queryRunner: QueryRunner): Promise<any> {
    // revert this "something" in db
    // await queryRunner.clearDatabase()
  }
  //#endregion
}
//#endregion
