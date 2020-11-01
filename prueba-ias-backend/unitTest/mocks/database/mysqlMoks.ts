export declare class Connections{}

export class Connection {

    private requestObj = new ClientBase();

    query() {
        return this.requestObj;
    }
}

class ClientBase {

    public resultProcedure: QueryArrayResult;
    constructor() {
        this.resultProcedure = new QueryArrayResult();
    }

    query() {
        return this.resultProcedure;
    }
}

class QueryArrayResult {
    private output: any;
    public rows: Array<any> = new Array();    

    public setaddRow(data: any) {
        this.output = {
            output: data
        };
    }

    public setRows(data: any) {
        this.rows = data;
    }

}
