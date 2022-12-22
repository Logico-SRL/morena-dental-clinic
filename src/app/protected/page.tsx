import { UserData } from "../../clientComponents/userData";
import { SplittedPage } from "../../serverComponents/layout/splittedPage";

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