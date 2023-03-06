import AddAreaRow from "@/app/admin/areas/components/AddAreaRow";
import {Area, Prisma} from "@prisma/client";
import prisma from "lib/prisma";
import DeleteAreaButton from "./components/DeleteAreaButton";
import {notFound, useRouter} from "next/navigation";

export default async function AreasPage() {
    const areas = await prisma.area.findMany({})
    console.log(areas)
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
