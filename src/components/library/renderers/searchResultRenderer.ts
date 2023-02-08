import { patientRenderer } from "./patientRenderer";
import { projectRenderer } from "./projectRenderer";
import { visitRenderer } from "./visitRenderer";

export const searchResulRenderer = {
    patient: patientRenderer,
    project: projectRenderer,
    visit: visitRenderer
}