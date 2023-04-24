'use client'
import {useRouter} from "next/navigation"


export default function RouteBackButton() {
    const router = useRouter()
    return (
        <div
            className="position-absolute start-0 nav-link-light fs-sm ps-4"
            onClick={() => router.back()}
        >
            חזור אחורה
            <i className="fi-arrow-long-left fs-base me-2"></i>
        </div>
    )
}