import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"


export default async function UserAuthorization() {
    const {user} = await getServerSession(authOptions) ?? {}
    return (
        <div className="row pt-4 mt-3">
            <div className="col-lg-3">
                <h2 className="h4">פרטי אימות</h2>
            </div>
            <div className="col-lg-9">
                <div className="border rounded-3 p-3" id="auth-info">
                    {/* <!-- Email--> */}
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="pe-2">
                            <label className="form-label fw-bold">אימייל</label>
                                <div id="email-value">{user?.email}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}