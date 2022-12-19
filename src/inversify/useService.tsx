import { Container } from "inversify"
import { IOCTypes } from "./iocTypes";
import { createContext, useContext, FunctionComponent } from "react"
import { WebIOCContainer } from "./inversify.web.config";

const InversifyContext = createContext<Container>(WebIOCContainer);

const IoCProvider: FunctionComponent<{}> = ({ children }) => (<InversifyContext.Provider value={WebIOCContainer}>
    {children}
</InversifyContext.Provider>)

const useService = <T,>(type: typeof IOCTypes[keyof typeof IOCTypes]) => {
    const container = useContext(InversifyContext);
    return container.get<T>(type);
}

export { IoCProvider, useService }