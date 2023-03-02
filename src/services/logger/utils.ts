import path from "path";
import { processEnv } from "../../processEnv";

export const getLogDir = () => {
    return path.isAbsolute(processEnv().logs.dirname) ?
        processEnv().logs.dirname :
        path.resolve(processEnv().logs.dirname);
}