import {Area} from "@prisma/client";
import {countAreas, getAreas} from "@/services/areaService";
import AddAreaRow from "@/app/admin/area/components/addAreaRow";
import CustomPagination from "@/components/pagination /customPagination";
import {countProfessions} from "@/services/professionService";

const getProfessionsByRange = ({skip, take}: { skip: number, take: number }): Promise<{ data: { areas: Area[] } }> => {
    return getProfessionsByRange({skip: skip, take: take})
}
const countAllProfessions = (): Promise<{ data: { count: number } }> => {
    return countProfessions({active: true})
}

