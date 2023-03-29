import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import UserAuthorization from "./components/UserAuthorization";
import UserProfileInfo from "./components/UserProfileInfo";
import UserAccountSettings from "./components/UserAccountSettings";
import HeaderMenu from "./components/HeaderMenu";

export default async function JobSeekerPage() {
    const {user} = await getServerSession(authOptions) ?? {}
    return (
        <>
            {/*HEADER MENU*/}
            {/* @ts-expect-error Server Component */}
            <HeaderMenu />
            {/*USER AUTHORIZATION INFO*/}
            {/* @ts-expect-error Server Component */}
            <UserAuthorization />
            {/*USER PROFILE INFO*/}
            <UserProfileInfo />
            {/*ACCOUNT SETTINGS*/}
            {/* @ts-expect-error Server Component */}
            <UserAccountSettings />
        </>
    )
}


