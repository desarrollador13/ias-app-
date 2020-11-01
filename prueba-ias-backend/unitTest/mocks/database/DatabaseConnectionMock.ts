import * as sql from './mysqlMoks'
import { Singleton } from 'typescript-ioc'

@Singleton

export default class DatabaseConnectionMock {

    private pool: any//Promise<sql.ConnectionPool>;

    constructor() {
        this.pool = new Promise(resolve => {
            resolve(new sql.Connection());
        });
    }

    public getPool() {
        console.log(this.pool,'conect')
        return this.pool;
    }

    public async setProcedureResponse(data:any, isRecorset:boolean=false) {
        if(!isRecorset) {
            //'false'
            (await this.pool).query().resultProcedure.setOutput(data);
        } else {
            //'true'
            (await this.pool).query().resultProcedure.setRows(data);
        }
    }
}
