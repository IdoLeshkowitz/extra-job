import JobSeekerNavBar from "@/app/jobseeker/components/jobSeekerNavBar";

export default function JobSeekerLayout({children}: { children: React.ReactNode }) {
    return (
        <div className='container content-overlay mt-5 mb-md-4 py-5'>
            <div className="bg-light shadow-sm rounded-3 p-4 p-md-5 mb-2 h-100" style={{direction: 'rtl',minHeight:'90vh'}}>
                <JobSeekerNavBar/>
                {children}
            </div>
        </div>
    )
}