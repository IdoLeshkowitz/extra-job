import {ReactNode} from "react";
import JobSearchBar from "@/components/jobSearchBar/JobSearchBar";

export default function JobListingLayout({children}: { children: ReactNode }) {
    return (
        <div className="container mt-5 mb-md-4 py-5">
            {children}
        </div>
    )
}