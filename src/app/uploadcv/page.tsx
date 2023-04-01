import ImageLoader from '@/components/Image/ImageLoader'
import UploadCvButton from "@/app/uploadcv/components/uploadCvButton";
import RouteBackButton from "@/components/buttons/routeBackButton";

const UploadCvPage = () => {
    return (
        <>
            <div className='container pb-lg-4 mb-sm-2 h-100 justify-content-center align-items-center d-flex'>
                <div className='card card-light card-body'>
                    <RouteBackButton/>
                    <div className='row mx-0 align-items-center'>
                        <div className='col-md-6 p-2 p-sm-5 border-start border-light'>
                            <h2 className='h3 text-light mb-4 mb-sm-5'>
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
