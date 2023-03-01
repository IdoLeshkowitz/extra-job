import JobBoardAccountLayout from "@/partials/JobBoardAccountLayout";

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return (
        <main className="page-wrapper">
            <JobBoardAccountLayout
                accountPageTitle='אזורים'
                activeAccountNav='/admin/all-areas'
            >
                {children}
            </JobBoardAccountLayout>
        </main>
    )
}