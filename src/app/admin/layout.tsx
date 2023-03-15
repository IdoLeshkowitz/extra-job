import AdminPageSideBar from "@/app/admin/components/AdminPageSideBar";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Role} from "@prisma/client";
import {redirect} from "next/navigation";

export default async function AdminLayout({children}: { children: React.ReactNode }) {
    const {user} = await getServerSession(authOptions) ?? {}
    if (!user || user.role !== Role.ADMIN) {
        return redirect('api/auth/signin')
    }
    return (
        <div className='container pt-5 pb-lg-4 mt-5 mb-sm-2'>
            <div className="row">
                {/*SIDE BAR*/}
                <AdminPageSideBar/>
                {/* Page content */}
                <div className=' col-sm-7 col-lg-8 mb-5 '>
                    {children}
                </div>
            </div>
        </div>
    )
}