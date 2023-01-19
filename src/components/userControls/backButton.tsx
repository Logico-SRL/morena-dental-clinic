import { useRouter } from "next/router";
import UserControls from "../../userControls";

export const BackButton = () => {

    const { back } = useRouter();
    const canUseBack = typeof window !== 'undefined' && window.history.length > 0

    return <UserControls.Button disabled={!canUseBack} size="large" type="primary" onClick={back}>
        Back
    </UserControls.Button>
}