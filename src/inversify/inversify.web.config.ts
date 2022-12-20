import 'reflect-metadata'
import { Container } from "inversify";
import { HttpService } from "../services/http/httpService";
import { IOCServiceTypes } from "./iocTypes";

const WebIOCContainer = new Container();

WebIOCContainer.bind<IHttpService>(IOCServiceTypes.HttpService).to(HttpService);

export { WebIOCContainer };

