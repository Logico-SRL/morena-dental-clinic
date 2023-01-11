import { SplittedPage } from "../components/layout/splittedPage";
// import { NodeIOCContainer } from "../inversify/inversify.node.config";

const Home: PageComponent = () => {

    // console.info('Home ..rest', rest);
    // const loaded = NodeIOCContainer.id;
    const Comp = () => <>
        <h1>NextAuth.js Example</h1>
        <p>
            This is an example site to demonstrate how to use{" "}
            <a href="https://next-auth.js.org">NextAuth.js</a> and
            Sign-In with Ethereum for authentication.
        </p>
    </>

    return (<SplittedPage Left={Comp} Right={() => (<p>Right part of the splitted Page</p>)} />)
}

export default Home;