import { PropsWithChildren } from "react";
import { NextPage } from 'next'
// import { NodeIOCContainer } from "../inversify/inversify.node.config";

const Home: PageComponent = () => {

    // console.info('Home ..rest', rest);
    // const loaded = NodeIOCContainer.id;

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