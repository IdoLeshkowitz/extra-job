import AdminPageSideBar from "@/app/admin/components/AdminPageSideBar";

export default async function AdminLayout({children}: { children: React.ReactNode }) {
    // const {user} = await getServerSession(authOptions) ?? {}
    // if (!user || user.role !== Role.ADMIN) {
    //     return redirect('api/auth/signin')
    // }
    return (
        <div className='container pt-5 pb-lg-4 mt-5 mb-sm-2'>
            <div className="row justify-content-sm-center">
                {/*SIDE BAR*/}
                <AdminPageSideBar/>
                {/* Page content */}
                <div className='col-md-7 col-lg-8 mb-5 col-sm-11'>
                    {children}
                </div>
            </div>
        </div>
    )
}