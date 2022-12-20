import { Container } from "inversify"
import { createContext, useContext, FunctionComponent, PropsWithChildren } from "react"
import { WebIOCContainer } from "./inversify.web.config";
import { IOCServiceTypes } from "./iocTypes";

const InversifyContext = createContext<Container>(WebIOCContainer);

const IoCProvider: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => (<InversifyContext.Provider value={WebIOCContainer}>
    {children}
</InversifyContext.Provider>)

const useService = <T,>(type: typeof IOCServiceTypes[keyof typeof IOCServiceTypes]) => {
    const container = useContext(InversifyContext);
    return container.get<T>(type);
}

export { IoCProvider, useService }