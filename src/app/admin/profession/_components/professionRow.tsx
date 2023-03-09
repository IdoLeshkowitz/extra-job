import DeleteProfessionButton from "@/app/admin/profession/_components/deleteProfessionButton";

export default function ProfessionRow({profession}: { profession: any }) {
    return (
        <li className="list-group-item bg-dark border-bottom border-light text-white d-flex flex-row-reverse justify-content-between h-25 align-items-center">
            {profession.name}
            <DeleteProfessionButton profession={profession}/>
        </li>
    )
}