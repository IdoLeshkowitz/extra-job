'use client';
import CursorParallax from '@/components/CursorParallax'
import SearchJobForm from "@/partials/SearchJobForm";

export default function HomePage() {
    return (
        <section className='bg-dark pb-4 pt-5'>
            <div className='container py-5'>
            <div className='row align-items-center mt-2 mt-md-0 pt-md-4 pt-lg-5 pb-5'>

                {/*CURSOR PARALLAX*/}
                <div className='col-md-5 order-md-2 mb-5 mb-md-0'>
                    <CursorParallax className='mx-auto'/>
                </div>

                {/*HEADLINE*/}
                <div className="col-md-7 order-md-1">
                    <h1 className='display-4 text-light pb-2 mb-4 mb-lg-5' style={{maxWidth: '29.5rem'}}>
                        הקריירה שלך זאת העבודה<span className='text-primary'> שלנו</span>
                    </h1>
                </div>
            </div>

                חיפוש משרה
            {/*    /!*SEARCH FORM*!/*/}
            <SearchJobForm/>
            </div>
        </section>
    )
}



