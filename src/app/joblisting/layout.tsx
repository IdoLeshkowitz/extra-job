import {ReactNode} from "react";
import JobListingSideBar from "@/app/joblisting/components/JobListingSideBar";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <div className='mt-5 pt-5 p-0 container-fluid'>
            <div className='row mt-n3'>
                <JobListingSideBar/>
                <div className='pb-5 pt-4 me-lg-5 col-lg-8 col-xl-9 col'>
                    {children}
                </div>
            </div>
        </div>
    )
}

