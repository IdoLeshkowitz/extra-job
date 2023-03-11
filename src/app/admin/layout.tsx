import SideBar from "@/app/admin/_components/SideBar";

export default function AdminLayout({children}: { children: React.ReactNode }) {
    return (
        <div className='container pt-5 pb-lg-4 mt-5 mb-sm-2'>
            <div className="row">
                {/*SIDE BAR*/}
                <SideBar/>

                {/* Page content */}
                <div className=' col-sm-7 col-lg-8 mb-5 '>
                    {children}
                </div>
            </div>
        </div>
    )
}