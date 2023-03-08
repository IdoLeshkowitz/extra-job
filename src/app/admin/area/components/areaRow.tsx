import {Area} from "@prisma/client";
import DeleteAreaButton from "@/app/admin/area/components/deleteAreaButton";

export default function AreaRow({area}: { area: any }) {
    return (
        <li className="list-group-item bg-dark border-bottom border-light text-white d-flex flex-row-reverse justify-content-between h-25 align-items-center">
            {area.name}
            <DeleteAreaButton area={area}/>
        </li>
    )
}