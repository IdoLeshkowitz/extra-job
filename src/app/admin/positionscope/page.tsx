import {countPositionScopes, getPositionScopes} from "@/services/positionScopeService";
import CreatePositionScope from "@/app/admin/positionscope/components/createPositionScope";
import ToastDismissible from "@/components/toasts/toastDismissible";
import DeactivatePositionScope from "@/app/admin/positionscope/components/deactivatePositionScope";

export default async function PositionScopePage({searchParams}: { searchParams: { skip?: string, take?: string } }) {
    const [skip, take]: number[] = [searchParams.skip ?? '0', searchParams.take ?? '5'].map((param) => parseInt(param))
    const [{data: positionScopesData, error: positionScopesError}, {data: countData, error: countError}] = await Promise.all([
        getPositionScopes({skip, take, where: {active: true}}),
        countPositionScopes({where: {active: true}})
    ])
    const positionScopes = positionScopesData?.positionScopes
    const count = countData?.count
    if (positionScopes === undefined || count === undefined) {
        if (positionScopesError) {
            return <ToastDismissible text='error in getPositionScopes' title='שגיאה'/>
        }
        if (countError) {
            return <ToastDismissible text='error in countPositionScopes' title='שגיאה'/>
        }
        return <ToastDismissible text='unkown error' title='שגיאה'/>
    }
    return (
        <>
            <h1 className='h2 text-light'> היקף משרות</h1>
            <div className="row pt-2">
                <div className="col-sm-12 col-md-12 col-lg-11">
                    <ul className="list-group gap-1">
                        <CreatePositionScope/>
                        {positionScopes.map((positionScope) => (
                            <li
                                key={positionScope.id}
                                style={{direction: 'rtl'}}
                                className="list-group-item bg-faded-dark shadow-sm rounded border-light d-flex justify-content-between  align-items-center p-3"
                            >
                                {positionScope.name}
                                <DeactivatePositionScope id={positionScope.id}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}


export const revalidate = 0;