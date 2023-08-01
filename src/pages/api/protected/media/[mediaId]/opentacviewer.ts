import { buildController } from '../../../../../controllers/buildController';
import { IOCControllerTypes } from '../../../../../inversify/iocTypes';

export default buildController(IOCControllerTypes.TacViewerController)

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10Mb'
        }
    },
};