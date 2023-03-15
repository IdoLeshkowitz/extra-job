import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import UserAuthorization from "@/components/userPage/UserAuthorization";

export default async function JobSeekerPage() {
    const {user} = await getServerSession(authOptions) ?? {}
    return (
        <>
            {/*USER AUTHORIZATION INFO*/}
            <UserAuthorization />
            {/*USER PROFILE INFO*/}
            <div className="row pt-4 mt-2">
                <div className="col-lg-3">
                    <h2 className="h4">Personal details</h2>
                </div>
                <div className="col-lg-9">
                    <div className="border rounded-3 p-3" id="personal-details">
                        {/* <!-- Full name--> */}
                        <div className="border-bottom pb-3 mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="pe-2">
                                    <label className="form-label fw-bold">Full name</label>
                                    <div id="fn-value">Annette Black</div>
                                </div>
                                <div data-bs-toggle="tooltip" title="Edit"><a className="nav-link py-0" href="#fn-collapse" data-bs-toggle="collapse"><i className="fi-edit"></i></a></div>
                            </div>
                            <div className="collapse" id="fn-collapse" data-bs-parent="#personal-details">
                                <input className="form-control mt-3" type="email" data-bs-binded-element="#fn-value" data-bs-unset-value="Not specified" value="Annette Black"/>
                            </div>
                        </div>
                        {/* <!-- Gender--> */}
                        <div className="border-bottom pb-3 mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="pe-2">
                                    <label className="form-label fw-bold">Gender</label>
                                    <div id="gender-value">Female</div>
                                </div>
                                <div data-bs-toggle="tooltip" title="Edit"><a className="nav-link py-0" href="#gender-collapse" data-bs-toggle="collapse"><i className="fi-edit"></i></a></div>
                            </div>
                            <div className="collapse" id="gender-collapse" data-bs-parent="#personal-details">
                                <select className="form-select mt-3" data-bs-binded-element="#gender-value">
                                    <option value="" disabled>Select your gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female" selected>Female</option>
                                </select>
                            </div>
                        </div>
                        {/* <!-- Date of birth--> */}
                        <div className="border-bottom pb-3 mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="pe-2">
                                    <label className="form-label fw-bold">Date of birth</label>
                                    <div id="birth-value">Not specified</div>
                                </div>
                                <div data-bs-toggle="tooltip" title="Edit"><a className="nav-link py-0" href="#birth-collapse" data-bs-toggle="collapse"><i className="fi-edit"></i></a></div>
                            </div>
                            <div className="collapse" id="birth-collapse" data-bs-parent="#personal-details">
                                <div className="mt-3 pt-3 border-top">
                                    <div className="input-group">
                                        <input className="form-control date-picker rounded pe-5" type="text" data-bs-binded-element="#birth-value" data-datepicker-options="{&quot;altInput&quot;: true, &quot;altFormat&quot;: &quot;F j, Y&quot;, &quot;dateFormat&quot;: &quot;F j, Y&quot;}" placeholder="Choose date"/><i className="fi-calendar text-muted position-absolute top-50 end-0 translate-middle-y me-3"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Phone number--> */}
                        <div className="border-bottom pb-3 mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="pe-2">
                                    <label className="form-label fw-bold">Phone number</label>
                                    <div id="phone-value">(302) 555-0107</div>
                                </div>
                                <div data-bs-toggle="tooltip" title="Edit"><a className="nav-link py-0" href="#phone-collapse" data-bs-toggle="collapse"><i className="fi-edit"></i></a></div>
                            </div>
                            <div className="collapse" id="phone-collapse" data-bs-parent="#personal-details">
                                <input className="form-control mt-3" type="text" data-bs-binded-element="#phone-value" data-bs-unset-value="Not specified" value="(302) 555-0107"/>
                            </div>
                        </div>
                        {/* <!-- Address--> */}
                        <div className="border-bottom pb-3 mb-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="pe-2">
                                    <label className="form-label fw-bold">Address</label>
                                    <div id="address-value">Not specified</div>
                                </div>
                                <div data-bs-toggle="tooltip" title="Edit"><a className="nav-link py-0" href="#address-collapse" data-bs-toggle="collapse"><i className="fi-edit"></i></a></div>
                            </div>
                            <div className="collapse" id="address-collapse" data-bs-parent="#personal-details">
                                <input className="form-control mt-3" type="text" data-bs-binded-element="#address-value" data-bs-unset-value="Not specified" placeholder="Enter address"/>
                            </div>
                        </div>
                        {/* <!-- Socials--> */}
                        <div>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="pe-2">
                                    <label className="form-label fw-bold">Socials</label>
                                    <ul className="list-unstyled mb-0">
                                        <li id="facebook-value">Not specified</li>
                                        <li id="linkedin-value"></li>
                                        <li id="twitter-value"></li>
                                        <li id="instagram-value"></li>
                                        <li id="behance-value"></li>
                                    </ul>
                                </div>
                                <div data-bs-toggle="tooltip" title="Edit"><a className="nav-link py-0" href="#socials-collapse" data-bs-toggle="collapse"><i className="fi-edit"></i></a></div>
                            </div>
                            <div className="collapse mt-3" id="socials-collapse" data-bs-parent="#personal-details">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"><i className="fi-facebook text-body"></i></div>
                                    <input className="form-control" type="text" data-bs-binded-element="#facebook-value" placeholder="Your Facebook account"/>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"><i className="fi-linkedin text-body"></i></div>
                                        <input className="form-control" type="text" data-bs-binded-element="#linkedin-value" placeholder="Your LinkedIn account"/>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"><i className="fi-twitter text-body"></i></div>
                                            <input className="form-control" type="text" data-bs-binded-element="#twitter-value" placeholder="Your Twitter account"/>
                                        </div>
                                    <div className="collapse" id="showMoreSocials">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"><i className="fi-instagram text-body"></i></div>
                                                <input className="form-control" type="text" data-bs-binded-element="#instagram-value" placeholder="Your Instagram account"/>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"><i className="fi-behance text-body"></i></div>
                                                    <input className="form-control" type="text" data-bs-binded-element="#behance-value" placeholder="Your Behance account"/>
                                                </div>
                                            </div><a className="collapse-label collapsed d-inline-block fs-sm fw-bold text-decoration-none pt-2 pb-3" href="#showMoreSocials" data-bs-toggle="collapse" data-bs-label-collapsed="Show more" data-bs-label-expanded="Show less" role="button" aria-expanded="false" aria-controls="showMoreSocials"><i className="fi-arrow-down me-2"></i></a>
                                        </div>
                                    </div>
                                </div>
                        </div>
            </div>
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


