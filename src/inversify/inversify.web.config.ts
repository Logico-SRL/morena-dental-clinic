import { Container } from "inversify";
import 'reflect-metadata';
import { HttpService } from "../services/http/httpService";
import { PubMedWebService } from '../services/pubmed/PubMedWebService';
import { IOCServiceTypes } from "./iocTypes";

const WebIOCContainer = new Container();

WebIOCContainer.bind<IHttpService>(IOCServiceTypes.HttpService).to(HttpService);
WebIOCContainer.bind<IPubMedWebService>(IOCServiceTypes.PubMedService).to(PubMedWebService);

export { WebIOCContainer };

