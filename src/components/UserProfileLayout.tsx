import React from "react"
import UserProfile from "./UserProfile.tsx"
import { LoginUserProvider } from "../providers/LoginUserProvider.tsx"

export const UserProfileLayout = () => {
    return (
        // <LoginUserProvider>
            <UserProfile />
        // </LoginUserProvider>
    )
}