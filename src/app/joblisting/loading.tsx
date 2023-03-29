'use client'
import JobListingSearchBar from "@/app/components/JobListingSearchBar";

export default function Loading() {
    return (
        <>
            <div className="row justify-content-center">
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}