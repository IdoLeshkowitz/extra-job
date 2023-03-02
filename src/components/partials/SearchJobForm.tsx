'use client'


export default function SearchJobForm() {
    return (
        <form className="form-group form-group-light d-block rounded-xl-pill mt-n3 mt-md-4 mt-xl-5 mb-md-4">
            <div className="row align-items-center g-1 ms-n2">
                <div className="col-md-5 col-xl-3">
                    <div className="input-group input-group-lg border-end-md border-light"><span
                        className="input-group-text text-light rounded-pill opacity-50 ps-3"><i
                        className="fi-search"></i></span>
                        <input className="form-control" type="text" placeholder="Search site..."/>
                    </div>
                </div>
                <hr className="hr-light d-md-none my-2"/>
                <div className="col-md-7 col-xl-4 d-sm-flex">
                    <div className="dropdown w-sm-50 border-end-sm border-light" data-bs-toggle="select">
                        <button className="btn btn-link dropdown-toggle" type="button"
                                data-bs-toggle="dropdown"><i className="fi-map-pin me-2"></i><span
                            className="dropdown-toggle-label">Location</span></button>
                        <input type="hidden"/>
                        <ul className="dropdown-menu dropdown-menu-dark my-3">
                            <li><a className="dropdown-item" href="#"><span
                                className="dropdown-item-label">Dallas</span></a></li>
                            <li><a className="dropdown-item" href="#"><span
                                className="dropdown-item-label">Chicago</span></a></li>
                            <li><a className="dropdown-item" href="#"><span
                                className="dropdown-item-label">Houston</span></a></li>
                            <li><a className="dropdown-item" href="#"><span
                                className="dropdown-item-label">Las Vegas</span></a></li>
                            <li><a className="dropdown-item" href="#"><span
                                className="dropdown-item-label">Los Angeles</span></a></li>
                            <li><a className="dropdown-item" href="#"><span
                                className="dropdown-item-label">New York</span></a></li>
                            <li><a className="dropdown-item" href="#"><span
                                className="dropdown-item-label">San Francisco</span></a></li>
                        </ul>
                    </div>
                    <hr className="hr-light d-sm-none my-2"/>
                    <div className="dropdown w-sm-50 border-end-xl border-light"
                         data-bs-toggle="select">
                        <button className="btn btn-link dropdown-toggle" type="button"
                                data-bs-toggle="dropdown"><i className="fi-geo me-2"></i><span
                            className="dropdown-toggle-label">Distance</span></button>
                        <input type="hidden"/>
                        <ul className="dropdown-menu dropdown-menu-dark my-3">
                            <li><a className="dropdown-item" href="#"><span
                                className="dropdown-item-label">10 miles</span></a></li>
                            <li><a className="dropdown-item" href="#"><span
                                className="dropdown-item-label">20 miles</span></a></li>
                            <li><a className="dropdown-item" href="#"><span
                                className="dropdown-item-label">30 miles</span></a></li>
                            <li><a className="dropdown-item" href="#"><span
                                className="dropdown-item-label">40 miles</span></a></li>
                            <li><a className="dropdown-item" href="#"><span
                                className="dropdown-item-label">50 miles</span></a></li>
                        </ul>
                    </div>
                    <hr className="hr-light d-xl-none mt-2 mb-3"/>
                    <div className="col-xl-5 d-sm-flex align-items-end">
                        <button
                            className="btn btn-primary btn-lg w-100 w-sm-50 w-lg-auto rounded-pill mt-4 mt-sm-0"
                            type="button">Find jobs
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}