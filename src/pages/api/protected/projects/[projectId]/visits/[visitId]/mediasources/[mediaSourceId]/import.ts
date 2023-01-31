import { buildController } from '../../../../../../../../../controllers/buildController';
import { IOCControllerTypes } from '../../../../../../../../../inversify/iocTypes';

export default buildController(IOCControllerTypes.FileImportController)

// export const config = {
//   api: {
//     bodyParser: false
//   },
// };