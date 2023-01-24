import { buildController } from '../../../../../controllers/buildController';
import { IOCControllerTypes } from '../../../../../inversify/iocTypes';

export default buildController(IOCControllerTypes.FileController)

export const config = {
    api: {
        // bodyParser: false
        responseLimit: false,

    },
};