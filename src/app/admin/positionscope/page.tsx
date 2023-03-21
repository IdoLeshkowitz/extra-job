import {countPositionScopes, getPositionScopes} from "@/services/positionScopeService";
import DeactivatePositionScope from "@/app/admin/positionscope/components/deactivatePositionScope";
import {FC} from "react";
import CreatePositionScope from "@/app/admin/positionscope/components/createPositionScope";
import {PositionScope} from "@prisma/client";

const getActivePositionScopesByRange = ({skip, take}: { skip: number, take: number }): Promise<{ data: { positionScopes: PositionScope[] } }> => {
    return getPositionScopes({active: true, skip: skip, take: take})
}
const countAllActivePositionScopes = (): Promise<{ data: { count: number } }> => {
    return countPositionScopes({active: true})
}

export default async function PositionScopePage({searchParams}: { searchParams: { skip?: string, take?: string } }) {
    const [skip, take]: number[] = [searchParams.skip ?? '0', searchParams.take ?? '5'].map((param) => parseInt(param))
    const [{data: {positionScopes}}, {data: {count}}] = await Promise.all([getActivePositionScopesByRange({skip, take}), countAllActivePositionScopes()])
    return (
        <>
            <h1 className='h2 text-light'>היקף משרות</h1>
            <div className="row pt-2">
                <div className="col-sm-12 col-md-12 col-lg-11">
                    <ul className="list-group">
                        <CreatePositionScope/>
                        {positionScopes.map((positionScope) => (
                            <PositionScopeRow key={positionScope.id} name={positionScope.name}
                                              id={positionScope.id}/>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}


interface PositionScopeRowProps {
    name: string
    id: string

}

const PositionScopeRow: FC<PositionScopeRowProps> = ({name, id}) => {
    return (
        <li className="list-group-item-text bg-faded-light rounded border-light d-flex flex-row-reverse justify-content-between h-25 align-items-center p-2">
            {name}
            <DeactivatePositionScope id={id}/>
        </li>
    )
}


export const revalidate = 0;