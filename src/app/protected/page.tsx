import { UserData } from "../../clientComponents/userData";

const Home: PageComponent = () => {
    return (
        <>
            <h1>Page protected by middleware</h1>
            <UserData />
        </>
    )
}

export default Home;