import { Collapse, Typography } from "antd";
import { Component, ErrorInfo, PropsWithChildren } from "react";
import { WebIOCContainer } from "../../inversify/inversify.web.config";
import { IOCServiceTypes } from "../../inversify/iocTypes";
// import { WebLogger } from "../../utils/logging/webLogger";

interface Props {

}

interface State {
    hasError: boolean;
    errorText: string;
    errorStack: string | undefined;
}


const ErrorPage = ({ errorText, errorStack }: Pick<State, 'errorText' | 'errorStack'>) => {
    const { Panel } = Collapse;

    return <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography.Title>Ci spiace... si è verificato un errore</Typography.Title>
        <Collapse style={{ width: '40vw' }}>
            <Panel header="Dettagli" key="1">
                <p>{errorText}</p>
                <p>{errorStack}</p>

            </Panel>
        </Collapse>
    </div>
}

class ErrorBoundary extends Component<PropsWithChildren<Props>, State> {

    public state: State = {
        hasError: false,
        errorText: '',
        errorStack: ''
    };

    private readonly logger: ILogger;
    private readonly httpService: IHttpService;
    /**
     *
     */
    constructor(p: any) {
        super(p);
        // this.logger = WebIOCContainer.get<ILogger>(IOCServiceTypes.LoggerService);
        this.httpService = WebIOCContainer.get<IHttpService>(IOCServiceTypes.HttpService)
    }

    private log = (obj: ILogObj) => {
        this.httpService.post(`/api/logger`, obj)
    }

    public static getDerivedStateFromError(e: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, errorText: e.message, errorStack: e.stack };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.log({
            level: 'error',
            message: 'ErrorBoundary Uncaught error',
            meta: { error, errorInfo }
        });
        // console.error('ErrorBoundary Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return <ErrorPage errorText={this.state.errorText} errorStack={this.state.errorStack} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;