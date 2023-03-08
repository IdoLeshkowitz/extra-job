import prisma from "lib/prisma";
import CustomPagination from "@/app/admin/areas/components/customPagination";
import {notFound} from "next/navigation";
import AreaRow from "./components/areaRow";
import AddAreaRow from "@/app/admin/areas/components/addAreaRow";

async function getAreasAndCount({skip, take}: { skip: number, take: number }) {
    /*
    * return {data : {areas: Area[], count: number}}
    * */
    const getAreas = () => prisma.area.findMany({
        skip,
        take,
        where:{active: true}
    })
    const getCount = () => prisma.area.count()
    try {
        const [areas, count] = await Promise.allSettled([getAreas(), getCount()])
        //check if all promises are fulfilled
        if (areas.status !== 'fulfilled') {
            console.error('unable to get areas')
            return notFound()
        }
        if (count.status !== 'fulfilled') {
            console.error('unable to get count')
            return notFound()
        }
        return {data: {areas: areas.value, count: count.value}}
    } catch (e) {
        console.error('unable to get areas')
        notFound()
    }
}

export default async function AreasPage({searchParams}: { searchParams: any }) {
    const [skip, take]: number[] = [searchParams.skip ?? 0, searchParams.take ?? 5].map((param) => parseInt(param))
    const {data} = await getAreasAndCount({skip, take})
    const {areas, count} = data
    return (
        <>
            <h1 className='h2 text-light'>איזורים</h1>
            <div className="row pt-2 bg-dark">
                <div className="col-sm-12 col-md-12 col-lg-11 bg-dark">
                    <div className="card bg-dark">
                        <ul className="list-group list-group-flush">
                            <AddAreaRow/>
                            {areas.map((area) => (
                                <AreaRow key={area.id} area={{...area, createdAt : area.createdAt.toISOString()}}/>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row pt-2 bg-dark"><CustomPagination count={count} skip={skip} take={take}/></div>
        </>
    )
}


export const dynamic = 'force-dynamic'