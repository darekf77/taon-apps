import { Taon, TaonBaseMigration, TaonMigration } from 'taon/src';
import { QueryRunner } from 'taon-typeorm/src';

//#region Migration class for context "HelloWorldContext"
@TaonMigration({
  className: 'HelloWorldContext_1770916800639_asdasd',
})
export class HelloWorldContext_1770916800639_asdasd extends TaonBaseMigration {
  //#region is migration for context HelloWorldContext ready to run
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

//#region Migration class for context "HelloWorldSimpleContext"
@TaonMigration({
  className: 'HelloWorldSimpleContext_1770916800639_asdasd',
})
export class HelloWorldSimpleContext_1770916800639_asdasd extends TaonBaseMigration {
  //#region is migration for context HelloWorldSimpleContext ready to run
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

//#region Migration class for context "SocketTableContext"
@TaonMigration({
  className: 'SocketTableContext_1770916800639_asdasd',
})
export class SocketTableContext_1770916800639_asdasd extends TaonBaseMigration {
  //#region is migration for context SocketTableContext ready to run
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

//#region Migration class for context "TaskContext"
@TaonMigration({
  className: 'TaskContext_1770916800639_asdasd',
})
export class TaskContext_1770916800639_asdasd extends TaonBaseMigration {
  //#region is migration for context TaskContext ready to run
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

//#region Migration class for context "TodoMvcContext"
@TaonMigration({
  className: 'TodoMvcContext_1770916800639_asdasd',
})
export class TodoMvcContext_1770916800639_asdasd extends TaonBaseMigration {
  //#region is migration for context TodoMvcContext ready to run
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
