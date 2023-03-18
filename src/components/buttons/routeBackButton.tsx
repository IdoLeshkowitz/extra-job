'use client'
import {useRouter} from "next/navigation"


export default function RouteBackButton() {
    const router = useRouter()
    return (
        <div
            className="position-absolute top-0 end-0 nav-link-light fs-sm py-1 px-2 mt-3 me-3"
            onClick={() => router.back()}
        >
            <i className="fi-arrow-long-left fs-base me-2"></i>
            Go back
        </div>
    )
}