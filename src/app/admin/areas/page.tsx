import AddAreaRow from "@/app/admin/areas/components/AddAreaRow";
import {Area} from "@prisma/client";
import DeleteAreaButton from "./components/DeleteAreaButton";

async function getAreas() {
    return await prisma?.area.findMany()
}

export default async function AreasPage() {
    const areas = await getAreas()
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
