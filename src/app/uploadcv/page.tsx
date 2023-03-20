import ImageLoader from '@/components/Image/ImageLoader'
import UploadCvButton from "@/app/uploadcv/components/uploadCvButton";
import RouteBackButton from "@/components/buttons/routeBackButton";

const UploadCvPage = () => {
    return (
        <>
            {/* Page wrapper */}
            <div className='container pt-5 pb-lg-4 mt-5 mb-sm-2'>
                {/* Sign in card */}
                <div className='card card-light card-body'>
                    <RouteBackButton/>
                    <div className='row mx-0 align-items-center'>
                        <div className='col-md-6 border-end-md border-light p-2 p-sm-5'>
                            <h2 className='h3 text-light mb-4 mb-sm-5' style={{direction:'rtl'}}>
                                בכדי להמשיך ולהגיש מועמדות <br/>יש להעלות קורות חיים
                            </h2>
                            <div className='d-flex justify-content-center'>
                                <ImageLoader
                                    src='/images/signin-modal/signin-dark.svg'
                                    width={344}
                                    height={292}
                                    alt='Illusration'
                                />
                            </div>
                        </div>
                        <div className='col-md-6 px-2 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5'>
                            <UploadCvButton/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadCvPage
