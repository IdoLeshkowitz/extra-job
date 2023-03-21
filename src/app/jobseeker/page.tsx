import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import UserProfileInfo from "./components/UserProfileInfo";
import HeaderMenu from "./components/HeaderMenu";
import UserAuthorization from "./components/UserAuthorization";
import UserAccountSettings from "./components/UserAccountSettings";


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


