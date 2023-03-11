import CustomPagination from "@/components/pagination /customPagination";
import AddAreaRow from "@/app/admin/area/_components/addAreaRow";
import {countAreas, getAreas} from "@/services/areaService";
import {Area} from "@prisma/client";
import {FC} from "react";
import DeactivateAreaButton from "@/app/admin/area/_components/deactivateAreaButton";

const getActiveAreasByRange = ({skip, take}: { skip: number, take: number }): Promise<{ data: { areas: Area[] } }> => {
    return getAreas({active: true, skip: skip, take: take})
}
const countAllActiveAreas = (): Promise<{ data: { count: number } }> => {
    return countAreas({active: true})
}


export default async function AreaPage({searchParams}: { searchParams: { skip?: string, take?: string } }) {
    const [skip, take]: number[] = [searchParams.skip ?? '0', searchParams.take ?? '5'].map((param) => parseInt(param))
    const [{data: {areas}}, {data: {count}}] = await Promise.all([getActiveAreasByRange({skip, take}), countAllActiveAreas()])
    return (
        <>
            <h1 className='h2 text-light'>איזורים</h1>
            <div className="row pt-2 bg-dark">
                <div className="col-sm-12 col-md-12 col-lg-11 bg-dark">
                    <div className="card bg-dark">
                        <ul className="list-group list-group-flush">
                            <AddAreaRow/>
                            {areas.map((area) => (
                                <AreaRow key={area.id} name={area.name} id={area.id}/>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row pt-2 bg-dark"><CustomPagination count={count} skip={skip} take={take}/></div>
        </>
    )
}

interface AreaRowProps {
    name: string
    id: string
}

const AreaRow: FC<AreaRowProps> = ({name, id}) => {
    return (
        <li className="list-group-item bg-dark border-bottom border-light text-white d-flex flex-row-reverse justify-content-between h-25 align-items-center">
            {name}
            <DeactivateAreaButton id={id}/>
        </li>
    )
}

