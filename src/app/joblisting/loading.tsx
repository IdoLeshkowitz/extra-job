'use client'
import JobListingSearchBar from "@/app/components/JobListingSearchBar";

export default function Loading() {
    return (
        <>
            <div className="row justify-content-center pb-3">
                <div className="col-10">
                    <h1 className='display-4 text-light pb-2 mb-4 mb-lg-5 text-center'>
                        המשרות<span className='text-primary'> שלנו</span>
                    </h1>
                    <JobListingSearchBar/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}