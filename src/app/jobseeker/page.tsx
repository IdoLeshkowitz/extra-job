import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import UserAuthorization from "@/components/userPage/UserAuthorization";
import UserProfileInfo from "@/components/userPage/UserProfileInfo";
import UserAccountSettings from "@/components/userPage/UserAccountSettings";
import HeaderMenu from "@/components/userPage/HeaderMenu";

/*
 NOTES:
 1.TOGGLE NOT WORKING IN MOBILE
 2.PRIVATE COMPONENTS SHOULD BE IN DIRECTORY
 3.HEBREW !!! RTL
*/
export default async function JobSeekerPage() {
    // todo : UNNECESSARY -->
    const {user} = await getServerSession(authOptions) ?? {}
    return (
        <>
            {/*todo : SUPPOSED TO BE IN LAYOUT */}
            {/*HEADER MENU*/}
            {/* @ts-expect-error Server Component */}
            <HeaderMenu/>
            {/*USER AUTHORIZATION INFO*/}
            {/* @ts-expect-error Server Component */}
            <UserAuthorization/>
            {/*USER PROFILE INFO*/}
            <UserProfileInfo/>
            {/*ACCOUNT SETTINGS*/}
            {/* @ts-expect-error Server Component */}
            <UserAccountSettings/>
            {/*ACTION BUTTONS*/}
            <div className="row pt-4 mt-2">
                <div className="col-lg-9 offset-lg-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <button className="btn btn-primary rounded-pill px-3 px-sm-4" type="button">Save changes
                        </button>
                        <button className="btn btn-link btn-sm px-0" type="button"><i className="fi-trash me-2"></i>Delete
                            account
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


