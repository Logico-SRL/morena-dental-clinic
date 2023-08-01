import { buildController } from '../../../../../../../../../../controllers/buildController';
import { IOCControllerTypes } from '../../../../../../../../../../inversify/iocTypes';

export default buildController(IOCControllerTypes.FileUploadController)

export const config = {
    api: {
        bodyParser: false
    },
};