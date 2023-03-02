import Database from 'better-sqlite3';
import Transport, { TransportStreamOptions } from 'winston-transport';


type ITransportOptions = TransportStreamOptions & {
    params: string[],
    db: string,
    tableName: string
}

export class Sqlite3Transport extends Transport {

    db: Database.Database;
    params: string[];
    insert: Database.Statement<string[]>

    constructor(options: ITransportOptions) {
        super(options);
        this.db = new Database(options.db);
        this.params = options.params; // || ['level', 'message', 'meta'];
        const table = options.tableName || 'logs';

        // the 'log' table always has 'id' and 'timestamp'
        const cols = [
            "id INTEGER PRIMARY KEY",
            "timestamp INTEGER DEFAULT (strftime('%s','now'))"
        ];

        // add user-provided columns to the table and create the table
        this.params.forEach(p => cols.push(`${p} TEXT`));
        this.db.prepare(`CREATE TABLE IF NOT EXISTS ${table} (${cols.join(', ')})`).run();

        // prepare the insert statement to be used while logging
        this.insert = this.db.prepare(`INSERT INTO ${table} (${this.params.join(', ')}) VALUES (${this.params.map(p => `@${p}`).join(', ')})`);
    }

    log(info: any, callback: () => void) {
        const logparams = Object.assign({}, info);
        console.info('transport info', logparams);
        const { timestamp, level, message, ...meta } = logparams
        setImmediate(() => this.emit('logged', info));

        // Perform the writing to the remote service
        const obj: any = { timestamp, level, message, meta: JSON.stringify(meta) };
        this.insert.run(obj);

        callback();
    }
};