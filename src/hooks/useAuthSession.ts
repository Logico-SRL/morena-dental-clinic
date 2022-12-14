import { useSession } from "next-auth/react"

export const useAuthSession = () => {

    const { data, status } = useSession();

    const userName = data?.user?.name || '';
    const userId = data?.user?.id || '';

    const isLoggedIn = status === 'authenticated';
    const isLoading = status === 'loading';


    return { userId, userName, isLoggedIn, isLoading }

}