import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import UserAuthorization from "@/components/userPage/UserAuthorization";
import UserProfileInfo from "@/components/userPage/UserProfileInfo";

export default async function JobSeekerPage() {
    const {user} = await getServerSession(authOptions) ?? {}
    return (
        <>
            {/*USER AUTHORIZATION INFO*/}
            <UserAuthorization />
            {/*USER PROFILE INFO*/}
            <UserProfileInfo />
            {/*ACCOUNT SETTINGS*/}
            <div className="row pt-4 mt-2">
                <div className="col-lg-3">
                    <h2 className="h4">Account settings</h2>
                </div>
                <div className="col-lg-9">
                    <div className="border rounded-3 p-3" id="account-settings">
                        {/* <!-- Account type--> */}
                        <div className="border-bottom pb-3 mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="pe-2">
                                    <label className="form-label fw-bold">Account type</label>
                                    <div id="type-value">Job seeker (looking for a job)</div>
                                </div>
                                <div data-bs-toggle="tooltip" title="Edit"><a className="nav-link py-0" href="#type-collapse" data-bs-toggle="collapse"><i className="fi-edit"></i></a></div>
                            </div>
                            <div className="collapse" id="type-collapse" data-bs-parent="#account-settings">
                                <select className="form-select mt-3" data-bs-binded-element="#type-value">
                                    <option value="" disabled>Select account type</option>
                                    <option value="Employer (looking for an employee)">Employer (looking for an employee)</option>
                                    <option value="Job seeker (looking for a job)" selected>Job seeker (looking for a job)</option>
                                </select>
                            </div>
                        </div>
                        {/* <!-- Two-factor authentication--> */}
                        <div>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="pe-2">
                                    <label className="form-label fw-bold">Two-factor authentication</label>
                                    <div id="auth-value">Inactive</div>
                                </div>
                                <div data-bs-toggle="tooltip" title="Edit"><a className="nav-link py-0" href="#auth-collapse" data-bs-toggle="collapse"><i className="fi-edit"></i></a></div>
                            </div>
                            <div className="collapse" id="auth-collapse" data-bs-parent="#account-settings">
                                <select className="form-select mt-3" data-bs-binded-element="#auth-value">
                                    <option value="" disabled>Enable / disbale two-factor authentication</option>
                                    <option value="Active">Enable</option>
                                    <option value="Inactive" selected>Disable</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*ACTION BUTTONS*/}
            <div className="row pt-4 mt-2">
                <div className="col-lg-9 offset-lg-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <button className="btn btn-primary rounded-pill px-3 px-sm-4" type="button">Save changes</button>
                        <button className="btn btn-link btn-sm px-0" type="button"><i className="fi-trash me-2"></i>Delete account</button>
                    </div>
                </div>
            </div>
        </>
    )
}


