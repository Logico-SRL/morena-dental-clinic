import { useRouter } from "next/router";
import UserControls from "../../userControls";

export const BackButton = ({ onBack }: { onBack?: () => void }) => {

    const { back } = useRouter();
    const canUseBack = onBack || typeof window !== 'undefined' && window.history.length > 0

    return <UserControls.Button disabled={!canUseBack} size="large" type="primary" onClick={onBack || back}>
        Back
    </UserControls.Button>
}