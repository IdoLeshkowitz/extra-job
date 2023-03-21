import {Profession} from "@prisma/client";
import CustomPagination from "@/components/pagination/customPagination";
import {countProfessions, getProfessions} from "@/services/professionService";
import {FC} from "react";
import DeactivateProfession from "@/app/admin/profession/components/deactivateProfession";
import CreateProfession from "@/app/admin/profession/components/createProfession";

const getActiveProfessionsByRange = async ({skip, take}: { skip: number, take: number }): Promise<{ data: { professions: Profession[] } }> => {
    return getProfessions({active: true, skip: skip, take: take});
}
const countAllProfessions = (): Promise<{ data: { count: number } }> => {
    return countProfessions({active: true})
}

export default async function ProfessionPage({searchParams}: { searchParams: any }) {
    const [skip, take]: number [] = [searchParams.skip ?? 0, searchParams.take ?? 5].map((param) => parseInt(param))
    const [{data: {professions}}, {data: {count}}] = await Promise.all([getActiveProfessionsByRange({skip, take}), countAllProfessions()])
    return (
        <>
            <h1 className='h2 text-light'>מקצועות</h1>
            <div className="row pt-2">
                <div className="col-sm-12 col-md-12 col-lg-11">
                    <ul className="list-group">
                        <CreateProfession/>
                        {professions.map((profession) => (
                            <ProfessionRow key={profession.id} name={profession.name} id={profession.id}/>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row pt-2"><CustomPagination count={count} skip={skip} take={take}/></div>
        </>
    )
}


interface ProfessionRowProps {

    name: string
    id: string
}

const ProfessionRow: FC<ProfessionRowProps> = ({name, id}) => {
    return (
        <li className="list-group-item-text border-light bg-faded-light d-flex flex-row-reverse justify-content-between h-25 align-items-center p-2">
            {name}
            <DeactivateProfession id={id}/>
        </li>
    )
}

export const revalidate = 0;
