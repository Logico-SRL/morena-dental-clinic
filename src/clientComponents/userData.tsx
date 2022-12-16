'use client'
import { useAuthSession } from "../hooks/useAuthSession";

export const UserData = () => {
    const { userId, userName } = useAuthSession();
    return <p>{userId} - {userName}</p>
}