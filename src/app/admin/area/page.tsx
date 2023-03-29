import CustomPagination from "@/components/pagination/customPagination";
import CreateArea from "@/app/admin/area/components/createArea";
import {countAreas, getAreas} from "@/services/areaService";
import DeactivateArea from "@/app/admin/area/components/deactivateArea";
import ToastDismissible from "@/components/toasts/toastDismissible";

export default async function AreaPage({searchParams}: { searchParams: { skip?: string, take?: string } }) {
    const [skip, take] = [searchParams.skip ?? '0', searchParams.take ?? '5'].map((param) => parseInt(param))
    const [{data: areasData, error: AreaError}, {data: countData, error: countError}] = await Promise.all([
        getAreas({skip, take, where: {active: true}}),
        countAreas({where: {active: true}})
    ])
    const areas = areasData?.areas
    const count = countData?.count
    if (areas === undefined || count === undefined) {
        if (AreaError) {
            return <ToastDismissible text='error in getAreas' title='שגיאה'/>
        }
        if (countError) {
            return <ToastDismissible text='error in countAreas' title='שגיאה'/>
        }
        return <ToastDismissible text='unkown error' title='שגיאה'/>
    }
    return (
        <>
            <h1 className='h2'>איזורים</h1>
            <div className="row pt-2">
                <div className="col-sm-12 col-md-12 col-lg-11">
                    <ul className="list-group gap-1">
                        <CreateArea/>
                        {areas.map(area => (
                            <li
                                key={area.id}
                                style={{direction: 'rtl'}}
                                className="list-group-item bg-faded-dark shadow-sm rounded border-light d-flex justify-content-between  align-items-center p-3"
                            >
                                {area.name}
                                <DeactivateArea id={area.id}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row pt-2"><CustomPagination count={count} skip={skip} take={take}/></div>
        </>
    )
}

export const revalidate = 0;

