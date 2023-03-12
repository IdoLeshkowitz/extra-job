import {JobListing} from "@prisma/client";
import {countJobListings, getJobListings} from "@/services/jobListingService";

const countAllActiveJobListings = (): Promise<{ data: { count: number } }> => {
    return countJobListings({active: true})
}
const getActiveJobListingsByRange = ({skip, take}: { skip: number, take: number }): Promise<{ data: { jobListings: JobListing[] } }> => {
    return getJobListings({active: true, skip: skip, take: take})
}
export default async function JobListingPage({searchParams}: { searchParams: { skip?: string, take?: string } }) {
    const [skip, take]: number[] = [searchParams.skip ?? '0', searchParams.take ?? '5'].map((param) => parseInt(param))
    const [{data: {jobListings}}, {data: {count}}] = await Promise.all([getActiveJobListingsByRange({skip, take}), countAllActiveJobListings()])
    return (
        <div>
            <h1 className="h2 text-light">משרות</h1>
            <div className="row pt-2 bg-dark">
                {
                    jobListings.map((jobListing, index) => (
                        <JobListingCard key={index} jobListing={jobListing}/>
                    ))
                }
            </div>
        </div>
    )
}


function JobListingCard({jobListing}: { jobListing: JobListing }) {
    return (
        <div className="card bg-secondary card-hover">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center">
                        <img className="me-2" src="path-to-image" width="24" alt="IT Pro TV"/>
                        <span className="fs-sm text-dark opacity-80 px-1">IT Pro TV</span>
                        <span className="badge bg-faded-accent rounded-pill fs-sm ms-2">Featured</span>
                    </div>
                    <div className="dropdown content-overlay">
                        <button type="button" className="btn btn-icon btn-light btn-xs rounded-circle shadow-sm"
                                id="contextMenu" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fi-dots-vertical"></i>
                        </button>
                        <ul className="dropdown-menu my-1" aria-labelledby="contextMenu">
                            <li>
                                <button type="button" className="dropdown-item">
                                    <i className="fi-heart opacity-60 me-2"></i>
                                    Add to wishlist
                                </button>
                            </li>
                            <li>
                                <button type="button" className="dropdown-item">
                                    <i className="fi-x-circle opacity-60 me-2"></i>
                                    Not interested
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 className="h6 card-title pt-1 mb-3">
                    <a href="#" className="text-nav stretched-link text-decoration-none">Business Analyst</a>
                </h3>
                <div className="fs-sm">
      <span className="text-nowrap me-3">
        <i className="fi-map-pin text-muted me-1"> </i>
        New York
      </span>
                    <span className="text-nowrap me-3">
        <i className="fi-cash fs-base text-muted me-1"></i>
        $7,500
      </span>
                </div>
            </div>
        </div>
    )
}