import AddAreaRow from "@/app/admin/areas/components/AddAreaRow";
import {Area, Prisma} from "@prisma/client";
import prisma from "lib/prisma";
import DeleteAreaButton from "./components/DeleteAreaButton";
import {notFound, useRouter} from "next/navigation";

export default async function AreasPage() {
    const res = await fetch('http://localhost:3000/api/areas', {cache: 'no-store'})
    const {data: areas}: { data: Area[] } = await res.json()
    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <AddAreaRow/>
                        {areas?.map(area => <AreaRow area={area} key={area.id}/>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function AreaRow({area}: { area: Area }) {
    return (
        <tr>
            <td>{area.name}</td>
            <td><DeleteAreaButton areaId={area.id}/></td>
        </tr>
    )
}
