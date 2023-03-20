export default function JobSeekerLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            {/*//todo :  WHAT IS THIS --->*/}
            {/*<div className="position-absolute top-0 start-0 w-100" style={{height: "398px"}}></div>*/}
            <div className='container content-overlay mt-5 mb-md-4 py-5'>
                {/*//todo : NOT WORKING EITHER REMOVE OR FIX*/}
                {/* Breadcrumb */}
                {/*<Breadcrumb className='breadcrumb-light mb-4 pt-md-3'>*/}
                {/*    <Breadcrumb.Item linkAs={Link} href='/car-finder'>Home</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item linkAs={Link} href='/car-finder/account-info'>Account</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item active>Details</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}
                <div className="bg-light shadow-sm rounded-3 p-4 p-md-5 mb-2" style={{direction:'rtl'}}>
                    {children}
                </div>
            </div>
        </>
    )
}