import {getUniqueJobListing} from "@/services/jobListingService";
import {Area, JobListing, PositionScope, Profession} from "@prisma/client";
import ToastDismissible from "@/components/toasts/toastDismissible";
import DropDownButtons from "@/components/dropdown/dropdownButtons";
import Link from "next/link";
import ToggleJobListingButton from "@/app/admin/joblisting/components/ToggleJobListingButton";

interface JobListingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    jobListingId: string
    light?: boolean
    key?: number
}


export default async function JobListingCardAdmin({jobListingId}: JobListingCardProps) {
    const {data: jobListingData, error: jobListingError} = await getUniqueJobListing({
        where  : {id: jobListingId},
        include: {
            area         : true,
            positionScope: true,
            profession   : true,
        }
    });
    const jobListing = jobListingData?.jobListing as JobListing & (JobListing & { area: Area, positionScope: PositionScope, profession: Profession });
    if (!jobListing) {
        return <ToastDismissible text='error in getUniqueJobListing' title='שגיאה'/>;
    }
    const {area, positionScope, name, profession, serialNumber, id, active, description, createdAt} = jobListing;
    const light = true;
    const img = {
        src: '/images/car-finder/icons/buyers.svg',
        alt: name,
    }
    return (
        <div
            className="card card-hover bg-faded-dark col-12 mb-2 shadow-lg"
            style={{direction: 'rtl'}}
        >
            <div className='card-body justify-content-between container d-flex row'>
                {/*TITLE*/}
                <h3 className='h6 card-title pb-1 w-auto col-3'>
                    <Link href={`/joblisting/${id}`}
                          className={`${light ? 'text-light opacity-80' : 'text-nav'} stretched-link text-decoration-none`}>
                        {name}
                    </Link>
                </h3>
                <div className="col-6">
                    <div className="row align-items-center">
                        <div className="col-4">
                            <span className="d-table badge bg-info">{`#${serialNumber}`}</span>
                        </div>
                        <div className="col-4">
                            <span
                                className={`badge bg-faded-${active ? 'success' : 'danger'} rounded-pill w-auto fw-bold`}
                            >
                                {active ? 'פעיל' : 'לא פעיל'}
                            </span>
                        </div>
                        <div className="col-4 justify-content-end d-flex">
                            {/*DROPDOWN BUTTONS*/}
                            <DropDownButtons light={false}>
                                <ToggleJobListingButton active={active} jobListingId={id}/>
                            </DropDownButtons>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

