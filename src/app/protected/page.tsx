import { FunctionComponent, PropsWithChildren } from "react";
import { UserData } from "../../clientComponents/userData";

const Home: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <h1>Page protected by middleware</h1>
            <UserData />
        </>
    )
}

export default Home;