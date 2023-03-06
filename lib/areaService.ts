import {Prisma} from "@prisma/client";
import prisma from "./prisma";

const AreaSelect = {id: true, name: true, createdAt: true}
export async function getAllAreas() {
    try {
        return await prisma?.area.findMany({select: AreaSelect})
    } catch (e) {
        throw new Error('failed to get all areas')
    }
}

export async function createArea(areaToCreate: Prisma.AreaCreateInput) {
    try {
        const area = await prisma.area.create({data: areaToCreate})
        return area
    } catch (e) {
        throw new Error('failed to create area')
    }
}

