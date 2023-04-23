import CursorParallax from "@/components/cursorParallax/CursorParallax";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Suspense} from "react";

export default async function JobSeekerPage() {
    const {user} = await getServerSession(authOptions) ?? {}
    return (
        <div className="row justify-content-evenly mt-5 align-items-center flex-column-reverse flex-lg-row gap-5">
            <div className="col-lg-5 d-flex justify-content-center">
                    <CursorParallax variant="2" className="shadow-lg rounded-3 pb-5"/>
            </div>
            <div className="col-auto d-flex align-items-center mb-5 flex-column">
                <h1>
                    <span className="text-success">ברוך שובך</span>
                    <br/>
                    {user?.name}
                </h1>
                <p>
                    לחץ על אחת מהאפשרויות למעלה כדי להתחיל
                </p>
            </div>
        </div>
    )
}