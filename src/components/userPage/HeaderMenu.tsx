

export default function HeaderMenu(){
    return (
        <>
            <div className="d-flex align-items-start justify-content-between pb-4 mb-2">
                <div className="d-flex align-items-start">
                    <div className="position-relative flex-shrink-0"><img className="rounded-circle" src="img/avatars/37.png" width="100" alt="Annette Black"/>
                        <button className="btn btn-icon btn-light btn-xs rounded-circle shadow-sm position-absolute end-0 bottom-0" type="button" data-bs-toggle="tooltip" title="Change image"><i className="fi-pencil fs-xs"></i></button>
                    </div>
                    <div className="ps-3 ps-sm-4">
                        <h3 className="h5">Annette Black</h3>
                        <ul className="list-unstyled fs-sm mb-0">
                            <li className="d-flex text-nav text-break"><i className="fi-mail opacity-60 mt-1 me-2"></i><span>annette_black@email.com</span></li>
                            <li className="d-flex text-nav text-break"><i className="fi-phone opacity-60 mt-1 me-2"></i><span>(302) 555-0107</span></li>
                        </ul>
                    </div>
                </div><a className="nav-link p-0 d-none d-md-block" href="signin-light.html"><i className="fi-logout mt-n1 me-2"></i>Sign out</a>
            </div>
            <a className="btn btn-outline-primary btn-lg rounded-pill w-100 d-md-none" href="#account-nav" data-bs-toggle="collapse"><i className="fi-align-justify me-2"></i>Account Menu</a>
            <div className="collapse d-md-block" id="account-nav">
                <ul className="nav nav-pills flex-column flex-md-row pt-3 pt-md-0 pb-md-4 border-bottom-md">
                    <li className="nav-item mb-md-0 me-md-2 pe-md-1"><a className="nav-link active" href="job-board-account-profile.html" aria-current="page"><i className="fi-settings mt-n1 me-2 fs-base"></i>Profile Settings</a></li>
                    <li className="nav-item mb-md-0 me-md-2 pe-md-1"><a className="nav-link" href="job-board-account-saved-jobs.html"><i className="fi-heart mt-n1 me-2 fs-base"></i>Saved Jobs</a></li>
                    <li className="nav-item mb-md-0"><a className="nav-link" href="job-board-account-notifications.html"><i className="fi-bell mt-n1 me-2 fs-base"></i>Notifications</a></li>
                    <li className="nav-item d-md-none"><a className="nav-link" href="signin-light.html"><i className="fi-logout mt-n1 me-2 fs-base"></i>Sign Out</a></li>
                </ul>
            </div>
        </>
    )
}