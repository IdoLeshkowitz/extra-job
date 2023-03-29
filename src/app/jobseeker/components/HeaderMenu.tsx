import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"


export default async function HeaderMenu(){

    const {user} = await getServerSession(authOptions) ?? {}

    return (
        <>
            <div className="d-flex align-items-start justify-content-between pb-4 mb-2">
                <div className="d-flex align-items-start">
                    <div className="pl-3 ps-sm-4">
                        <h3 className="h5" style={{textAlign:'center'}}>{user?.name}</h3>
                        <ul className="list-unstyled fs-sm mb-0">
                            <li className="d-flex text-nav text-break"><i className="fi-mail opacity-60 mt-1 mr-2"></i><span>&nbsp;&nbsp;{user?.email}</span></li>
                            {user?.phone ?
                                <li className="d-flex text-nav text-break"><i className="fi-phone opacity-60 mt-1 mr-2"></i><span>&nbsp;&nbsp;{user.phone}</span></li> :
                                null
                            }
                        </ul>
                    </div>
                </div><a className="nav-link p-0 d-none d-md-block" href="signin-light.html"><i className="fi-logout mt-n1 mr-5"></i>&nbsp;התנתק</a>
            </div>
        </>
    )
}