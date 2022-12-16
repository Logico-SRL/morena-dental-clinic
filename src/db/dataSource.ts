// import 'server-only';
import "reflect-metadata";
import { DataSource } from "typeorm";
import { dbConfig } from "./dbConfig";

const dataSource = new DataSource(dbConfig);

const defaultDataSource = async () => {
    const ret = dataSource;
    if (!ret.isInitialized)
        await ret.initialize();
    return ret;
};

export default defaultDataSource;