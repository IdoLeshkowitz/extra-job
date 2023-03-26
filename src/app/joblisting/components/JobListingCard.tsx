import {getUniqueJobListing} from "@/services/jobListingService";
import {Area, JobListing, PositionScope, Profession} from "@prisma/client";

function getDateString(date: Date) {
    const d = new Date(date)
    const year = d.toLocaleString('he-IL', {year: 'numeric'})
    const month = d.toLocaleString('he-IL', {month: 'long'})
    const day = d.toLocaleString('he-IL', {day: 'numeric'})
    return `${year} ${month} ${day}`.split(' ').reverse().join(' ')
}

interface JobListingCardProps {
    jobListingId: string
    className?: string
    children?: React.ReactNode
}

export default async function JobListingCard({jobListingId, className, children}: JobListingCardProps) {
    const {data, error} = await getUniqueJobListing({
        where  : {
            id: jobListingId
        },
        include: {
            area           : true,
            profession     : true,
            positionScope  : true,
            JobApplications: true,
        },
    })
    if (error) {
        return <div>error</div>
    }
    const {serialNumber, name, description, area, profession, createdAt, positionScope} = data?.jobListing as JobListing & (JobListing & { area: Area, positionScope: PositionScope, profession: Profession })
    return (
            <div className="card bg-faded-dark card-hover col-md-3 border-0 p-1">

            </div>
    )
}