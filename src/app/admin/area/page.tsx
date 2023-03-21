import CustomPagination from "@/components/pagination/customPagination";
import CreateArea from "@/app/admin/area/components/createArea";
import {countAreas, getAreas} from "@/services/areaService";
import {Area} from "@prisma/client";
import {FC} from "react";
import DeactivateArea from "@/app/admin/area/components/deactivateArea";

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
            <h1 className='h2'>איזורים</h1>
            <div className="row pt-2">
                <div className="col-sm-12 col-md-12 col-lg-11">
                        <ul className="list-group">
                            <CreateArea/>
                            {areas.map((area) => (
                                <AreaRow key={area.id} name={area.name} id={area.id}/>
                            ))}
                        </ul>
                </div>
            </div>
            <div className="row pt-2"><CustomPagination count={count} skip={skip} take={take}/></div>
        </>
    )
}

interface AreaRowProps {
    name: string
    id: string
}

const AreaRow: FC<AreaRowProps> = ({name, id}) => {
    return (
        <li className="list-group-item-text bg-faded-light rounded border-light d-flex flex-row-reverse justify-content-between h-25 align-items-center p-2">
            {name}
            <DeactivateArea id={id}/>
        </li>
    )
}

