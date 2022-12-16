import { FunctionComponent, PropsWithChildren } from "react";
import Layout from "../serverComponents/rootPageLayout";

const Home: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <h1>NextAuth.js Example</h1>
            <p>
                This is an example site to demonstrate how to use{" "}
                <a href="https://next-auth.js.org">NextAuth.js</a> and
                Sign-In with Ethereum for authentication.
            </p>


        </>
    )
}

export default Home;