import CursorParallax from '@/components/cursorParallax/CursorParallax'

export default function HomePage() {
    return (
        <section className='bg-dark pb-4 pt-5'>
            <div className='container-fluid'>
                <div className='row align-items-end mt-2 mt-md-0 pt-md-4 pt-lg-5 pb-5 p-5 '>
                    {/*HEADLINE*/}
                    <div className="col-md-7 order-md-2 pe-5 pt-5 d-flex justify-content-center">
                        <h1 className='display-4 text-light pb-2 mb-4 mb-lg-5' style={{maxWidth: '29.5rem'}}>
                            הקריירה שלך זאת העבודה<span className='text-primary'> שלנו</span>
                        </h1>
                    </div>
                    {/*CURSOR PARALLAX*/}
                    <div className='col-md-5 order-md-1 mb-5 mb-md-0 py-5'>
                        <CursorParallax className='mx-auto'/>
                    </div>
                </div>
                <div className='container content-overlay py-md-5 mt-n2 mb-lg-3'>
                    <div className='mt-5 mb-md-5 py-5'>
                        <div className='col-xl-6 col-lg-8 col-md-10 mx-auto mb-sm-5 mb-4  text-center'>
                            <h1 className='display-5 text-light d-flex flex-wrap align-items-center justify-content-center mt-sm-5 mt-4 my-3'>
                                <span className='me-2 text-primary'>משרות</span>
                                <span>חיפוש</span>
                            </h1>
                            <p className='fs-lg text-white'>חפש עבודה לפי איזור ומקצוע</p>
                        </div>
                        <div className='mx-auto px-0 col-xl-8 col-lg-9 col-md-10'>

                            {/* Search form */}
                            search job bar
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}



