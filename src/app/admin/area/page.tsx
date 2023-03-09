import CustomPagination from "@/app/admin/area/_components/customPagination";
import AddAreaRow from "@/app/admin/area/_components/addAreaRow";
import {getAreasAndCount} from "@/services/areaService";
import AreaRow from "@/app/admin/area/_components/areaRow";
import prisma from "../../../../lib/prisma";

export default async function AreaPage({searchParams}: { searchParams: any }) {
    const [skip, take]: number[] = [searchParams.skip ?? 0, searchParams.take ?? 5].map((param) => parseInt(param))
    const {data : {areas,count}} = await getAreasAndCount({skip, take})
    return (
        <>
            <h1 className='h2 text-light'>איזורים</h1>
            <div className="row pt-2 bg-dark">
                <div className="col-sm-12 col-md-12 col-lg-11 bg-dark">
                    <div className="card bg-dark">
                        <ul className="list-group list-group-flush">
                            <AddAreaRow/>
                            {areas.map((area) => (
                                <AreaRow key={area.id} area={{...area}} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row pt-2 bg-dark"><CustomPagination count={count} skip={skip} take={take}/></div>
        </>
    )
}
