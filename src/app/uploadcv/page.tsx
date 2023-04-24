import ImageLoader from '@/components/Image/ImageLoader'
import UploadCvButton from "@/app/uploadcv/components/uploadCvButton";
import RouteBackButton from "@/components/buttons/routeBackButton";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

const UploadCvPage = async () => {
    const {user} = await getServerSession(authOptions) ?? {}
    if (!user) {
        return redirect('/api/auth/signin')
    }
    return (
        <div className='card card-light card-body rounded-3 shadow-sm'>
            <RouteBackButton/>
            <div className='row mx-0 align-items-center'>
                <div className='col-md-6 p-2 p-sm-5 border-start border-light'>
                    {
                        user?.cv ?
                            <div className="row">
                                <h2 className='h3 text-light mb-4 mb-sm-5 d-inline-block'>
                                    <i className="fi-check fs-1 text-success d-inline ms-3"></i>
                                    קורות חיים
                                </h2>
                            </div>
                            :
                            <div className="row">
                                <UploadCvButton/>
                            </div>
                    }
                    {
                        user?.phone ?
                            <div className="row">
                                <h2 className='h3 text-light mb-4 mb-sm-5 d-inline-block'>
                                    <i className="fi-check fs-1 text-success d-inline ms-3"></i>
                                    מס׳ טלפון
                                </h2>
                            </div>
                            :
                            <>
                            </>
                    }
                </div>
                <div className='col-md-6 px-2 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5'>
                    <div className='d-flex justify-content-center'>
                        <ImageLoader
                            src='/images/signin-modal/signin-dark.svg'
                            width={344}
                            height={292}
                            alt='Illusration'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadCvPage
