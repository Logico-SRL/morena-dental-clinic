import { buildController } from '../../../../../controllers/buildController';
import { IOCControllerTypes } from '../../../../../inversify/iocTypes';

export default buildController(IOCControllerTypes.FileDownloadController)

export const config = {
  api: {
    bodyParser: false
  },
};