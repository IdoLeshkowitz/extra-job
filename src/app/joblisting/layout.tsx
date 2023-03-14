import {ReactNode} from "react";
import JobSearchBar from "@/components/jobSearchBar/JobSearchBar";

export default function JobListingLayout({children}: { children: ReactNode }) {
    return (
        <div className="container mt-5 mb-md-4 py-5">
            {/*HEADER*/}
            <div className="row justify-content-center">
                <div className="col-10">
                    <h1 className='display-4 text-light pb-2 mb-4 mb-lg-5 text-center'>
                        המשרות<span className='text-primary'> שלנו</span>
                    </h1>
                    <JobSearchBar/>
                </div>
            </div>
        </div>
    )
}