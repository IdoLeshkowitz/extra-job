import NewAreaForm from "@/components/NewAreaForm";
import {Area} from "../../../../../lib/models/area/schema";
import DeleteAreaButton from "@/components/DeleteAreaButton";
import {Container} from "react-bootstrap";

async function getAllAreas() {
    const res = await fetch(`http://localhost:3001/api/area`, {cache: 'no-cache'})
    if (!res.ok) {
        throw new Error('failed to fetch areas')
    }
    return await res.json()
}

export default async function Areas() {
    const {data: allAreas} = await getAllAreas()
    return (
        <main className="page-wrapper">
            <section className='bg-light pt-5 pb-4'>
                    <div className="table-responsive">
                        <table className="table-striped table ">
                            <thead>
                                <tr>
                                    <th scope="col">שם האזור</th>
                                    <th scope="col">מחק</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allAreas.map((area: Area) => (
                                    <tr key={area._id as unknown as string}>
                                        <td>{area.name}</td>
                                        <td>
                                            <DeleteAreaButton areaId={area._id as unknown as string}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="add-area-form">
                            <NewAreaForm allAreas={allAreas}/>
                        </div>
                    </div>
            </section>
        </main>
    )
}
