'use client';
import {useRouter} from "next/navigation";
import {Button} from "react-bootstrap";

export default function ApplyButton({jobListingId}: { jobListingId: string }) {
    const router = useRouter();
    const handleApply = async () => {
        ////do something
    };
    return (
        <Button variant='primary btn-lg rounded-pill w-sm-auto w-100' onClick={handleApply}>
            <i className='fi-briefcase fs-sm ms-2'></i>
            הגש מועמדות
        </Button>
    );
}
