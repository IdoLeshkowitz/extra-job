import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"


export default async function UserAccountSettings() {

    const {user} = await getServerSession(authOptions) ?? {}

    return (
        <div className="row pt-4 mt-2">
            <div className="col-lg-3">
                <h2 className="h4">פרטי החשבון</h2>
            </div>
            <div className="col-lg-9">
                <div className="border rounded-3 p-3" id="account-settings">
                    {/* <!-- Account type--> */}
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="pe-2">
                            <label className="form-label fw-bold">סוג החשבון</label>
                            <div id="type-value">{user?.role ? user.role : "Job Seeker"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}