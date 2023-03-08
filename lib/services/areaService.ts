import prisma from "../prisma";
import {Prisma} from "@prisma/client";
import AreaUpdateInput = Prisma.AreaUpdateInput;


export async function createArea(data: Prisma.AreaCreateInput) {
    //check if area already exists
    const areaExists = await prisma.area.findFirst({
        where: {
            name: data.name
        }
    })
    //if area exists activate it
    if (areaExists) {
        const areaUpdateInput: AreaUpdateInput = {
            createdAt: areaExists.createdAt,
            name: areaExists.name,
            active: true
        }
        const updatedArea = await updateArea(areaExists.id, areaUpdateInput);
        return updatedArea;
    }
    //if area does not exist create it
    const addedArea = await prisma.area.create({
        data,
    });
    return addedArea;
}

export async function updateArea(id: string, data: AreaUpdateInput) {
    const updatedArea = await prisma.area.update({
        where: {id},
        data,
    });
    return updatedArea;
}

export async function getAreas(take: number, skip: number) {
    const areas = await prisma.area.findMany({
        take,
        skip,
    });
    return areas;
}