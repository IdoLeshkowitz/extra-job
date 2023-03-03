'use client';
import CursorParallax from '@/components/CursorParallax'
import SearchJobForm from "@/partials/SearchJobForm";
import BgParallax from "@/components/BgParallax";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

export default function HomePage() {
    return (
        <section className='bg-dark pb-4 pt-5'>
            <div className='container-fluid'>
                <div className='row align-items-center mt-2 mt-md-0 pt-md-4 pt-lg-5 pb-5 p-5'>

                    {/*CURSOR PARALLAX*/}
                    <div className='col-md-5 order-md-2 mb-5 mb-md-0 py-5'>
                        <CursorParallax className='mx-auto'/>
                    </div>

                    {/*HEADLINE*/}
                    <div className="col-md-7 order-md-1">
                        <h1 className='display-4 text-light pb-2 mb-4 mb-lg-5' style={{maxWidth: '29.5rem'}}>
                            הקריירה שלך זאת העבודה<span className='text-primary'> שלנו</span>
                        </h1>
                    </div>
                </div>

                <BgParallax
                    contentWrapper={null}
                    imgSrc='/images/job-board/blog/15.jpg'
                    type='scroll' // scale, opacity, scroll-opacity, scale-opacity
                    speed={0.5} // from -1.0 to 2.0
                    overlay='gradient' // or overlay={50} from 0 to 100
                    className=' bg-dark zindex-1 '
                >
                    <Container className='content-overlay py-md-5 mt-n2 mb-lg-3'>
                        <div className='mt-5 mb-md-5 py-5'>
                            <Col xl={6} lg={8} md={10} className='mx-auto mb-sm-5 mb-4  text-center'>
                                <h1 className='display-5 text-light d-flex flex-wrap align-items-center justify-content-center mt-sm-5 mt-4 my-3'>
                                    <span className='me-2 text-primary'>משרות</span>
                                    <span>חיפוש</span>
                                </h1>
                                <p className='fs-lg text-white'>חפש עבודה לפי איזור ומקצוע</p>
                            </Col>
                            <Col xl={8} lg={9} md={10} className='mx-auto px-0'>

                                {/* Search form */}
                                <SearchJobForm/>
                            </Col>
                        </div>
                    </Container>
                </BgParallax>
            </div>
        </section>
    )
}



