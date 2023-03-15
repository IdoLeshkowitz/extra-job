import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"


export default async function UserAuthorization() {
    const {user} = await getServerSession(authOptions) ?? {}
    return (
        <div className="row pt-4 mt-3">
            <div className="col-lg-3">
                <h2 className="h4">Authorization info</h2>
            </div>
        <div className="col-lg-9">
            <div className="border rounded-3 p-3" id="auth-info">
                {/* <!-- Email--> */}
                <div className="border-bottom pb-3 mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="pe-2">
                            <label className="form-label fw-bold">Email</label>
                                <div id="email-value">annette_black@email.com</div>
                        </div>
                        <div data-bs-toggle="tooltip" title="Edit"><a className="nav-link py-0" href="#email-collapse" data-bs-toggle="collapse"><i className="fi-edit"></i></a></div>
                    </div>
                    <div className="collapse" id="email-collapse" data-bs-parent="#auth-info">
                        <input className="form-control mt-3" type="email" data-bs-binded-element="#email-value" data-bs-unset-value="Not specified" value="annette_black@email.com"/>
                    </div>
                </div>
                {/* <!-- Password--> */}
                <div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="pe-2">
                            <label className="form-label fw-bold">Password</label>
                            <div>********</div>
                        </div>
                        <div data-bs-toggle="tooltip" title="Edit"><a className="nav-link py-0" href="#password-collapse" data-bs-toggle="collapse"><i className="fi-edit"></i></a></div>
                    </div>
                    <div className="collapse" id="password-collapse" data-bs-parent="#auth-info">
                        <div className="row gx-3 align-items-center my-3">
                            <label className="col-sm-4 col-md-3 col-form-label" htmlFor="account-password-current">Current password:</label>
                            <div className="col-sm-8 col-md-9">
                                <div className="password-toggle">
                                    <input className="form-control" type="password" id="account-password-current" placeholder="Enter current password"/>
                                    <label className="password-toggle-btn" aria-label="Show/hide password">
                                    <input className="password-toggle-check" type="checkbox"/><span className="password-toggle-indicator"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row gx-3 align-items-center my-3">
                            <label className="col-sm-4 col-md-3 col-form-label" htmlFor="account-password-new">New password:</label>
                            <div className="col-sm-8 col-md-9">
                                <div className="password-toggle">
                                    <input className="form-control" type="password" id="account-password-new" placeholder="Enter new password"/>
                                    <label className="password-toggle-btn" aria-label="Show/hide password">
                                    <input className="password-toggle-check" type="checkbox"/><span className="password-toggle-indicator"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-3 align-items-center">
                        <label className="col-sm-4 col-md-3 col-form-label" htmlFor="account-password-confirm">Confirm new password:</label>
                            <div className="col-sm-8 col-md-9">
                                <div className="password-toggle">
                                    <input className="form-control" type="password" id="account-password-confirm" placeholder="Confirm new password"/>
                                    <label className="password-toggle-btn" aria-label="Show/hide password">
                                    <input className="password-toggle-check" type="checkbox"/><span className="password-toggle-indicator"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}