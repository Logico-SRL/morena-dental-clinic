import { IOCControllerTypes } from "../../../inversify/iocTypes"
import { buildController } from "../../../controllers/buildController"

export default buildController(IOCControllerTypes.PatientsController)