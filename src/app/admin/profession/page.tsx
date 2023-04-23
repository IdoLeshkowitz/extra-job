import CustomPagination from "@/components/pagination/customPagination";
import {countProfessions, getProfessions} from "@/services/professionService";
import DeactivateProfession from "@/app/admin/profession/components/deactivateProfession";
import CreateProfession from "@/app/admin/profession/components/createProfession";
import ToastDismissible from "@/components/toasts/toastDismissible";

export default async function ProfessionPage({searchParams}: { searchParams: any }) {
    const [skip, take]: number[] = [searchParams.skip ?? '0', searchParams.take ?? '5'].map((param) => parseInt(param))
    const [{data: professionsData, error: professionError}, {data: countData, error: countError}] = await Promise.all([
        getProfessions({skip, take, where: {active: true}}),
        countProfessions({where: {active: true}})
    ])
    const professions = professionsData?.professions
    const count = countData?.count
    if (professions === undefined || count === undefined) {
        if (professionError) {
            return <ToastDismissible text='error in getProfessions' title='שגיאה'/>
        }
        if (countError) {
            return <ToastDismissible text='error in countProfessions' title='שגיאה'/>
        }
        return <ToastDismissible text='unkown error' title='שגיאה'/>
    }
    return (
        <>
            <h1 className='h2'>מקצועות</h1>
            <div className="row pt-2">
                <div className="col-sm-12 col-md-12 col-lg-11">
                    <ul className="list-group gap-1">
                        <CreateProfession/>
                        {professions.map(profession => (
                            <li
                                key={profession.id}
                                style={{direction: 'rtl'}}
                                className="list-group-item bg-faded-dark shadow-sm rounded border-light d-flex justify-content-between  align-items-center p-3"
                            >
                                {profession.name}
                                <DeactivateProfession id={profession.id}/>
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
