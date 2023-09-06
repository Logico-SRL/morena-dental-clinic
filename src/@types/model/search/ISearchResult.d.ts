type IPatientSearchResult = { type: 'patient' } & IPatient
type IProjectSearchResult = { type: 'project' } & IProject
type IVisitSearchResult = { type: 'visit' } & IVisit

type ISearchResult = IPatientSearchResult | IProjectSearchResult | IVisitSearchResult