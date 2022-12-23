import { SplittedPage } from "../../components/layout/splittedPage";
import { UserData } from "../../components/userData";

const Protected: PageComponent = () => {

    const Comp = () => (
        <>
            <h1>Page protected by middleware</h1>
            <UserData />
        </>
    )

    return (<SplittedPage Left={Comp} />)


}

export default Protected;