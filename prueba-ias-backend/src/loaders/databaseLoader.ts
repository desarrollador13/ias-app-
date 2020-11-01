import { Pool } from 'pg'
import { Singleton } from 'typescript-ioc'
import config from '../config'
/**
 * @category Database
 */
@Singleton
export default class DatabaseConnection {
  private connection:any
  constructor() {}
  public async getPool() {
      // this.connection = new Pool({
      //   host:'localhost',
      //   user:'postgres',
      //   database:'app',
      //   password:'admin',
      //   //port: 5432,
      //   max: 20,
      //   idleTimeoutMillis: 30000,
      //   connectionTimeoutMillis: 2000,
      // })
      this.connection = new Pool({
        host:'database_prueba',
        user:'postgres',
        database:'app',
        password:'admin',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      })
    return this.connection 
  }
}