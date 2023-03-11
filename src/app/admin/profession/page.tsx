import {Area, Profession} from "@prisma/client";
import {countAreas, getAreas} from "@/services/areaService";
import AddAreaRow from "@/app/admin/area/components/addAreaRow";
import CustomPagination from "@/components/pagination /customPagination";
import {countProfessions, getProfessions} from "@/services/professionService";
import {FC} from "react";
import DeactivateAreaButton from "@/app/admin/area/components/deactivateAreaButton";
import DeactivateProfessionButton from "@/app/admin/profession/components/deactivateProfessionButton";
import AddProfessionRow from "@/app/admin/profession/components/addProfessionRow";

const getActiveProfessionsByRange = ({skip, take}: { skip: number, take: number }): Promise<{ data: { professions: Profession[] } }> => {
    return getProfessions({active: true, skip: skip, take: take})
}
const countAllProfessions = (): Promise<{ data: { count: number } }> => {
    return countProfessions({active: true})
}

export default async function ProfessionPage({searchParams}: { searchParams: any }) {
    const [skip, take] :number [] = [searchParams.skip ?? 0, searchParams.take ?? 5].map((param) => parseInt(param))
    const [{data : {professions}},{data : {count}}] = await Promise.all([getActiveProfessionsByRange({skip,take}), countAllProfessions()])
    return (
        <>
            <h1 className='h2 text-light'>מקצועות</h1>
            <div className="row pt-2 bg-dark">
                <div className="col-sm-12 col-md-12 col-lg-11 bg-dark">
                    <div className="card bg-dark">
                        <ul className="list-group list-group-flush">
                            <AddProfessionRow/>
                            {professions.map((profession) => (
                                <ProfessionRow key={profession.id} name={profession.name} id={profession.id}/>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row pt-2 bg-dark"><CustomPagination count={count} skip={skip} take={take}/></div>
        </>
    )
}


interface ProfessionRowProps {

    name : string
    id : string
}
const ProfessionRow : FC<ProfessionRowProps> = ({name, id}) => {
    return (
        <li className="list-group-item bg-dark border-bottom border-light text-white d-flex flex-row-reverse justify-content-between h-25 align-items-center">
            {name}
            <DeactivateProfessionButton id={id}/>
        </li>
    )
}