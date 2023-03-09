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

export async function getAreasAndCount({skip, take}: { skip: number, take: number }) {
    /*
    * return {data : {areas: Area[], count: number}}
    * */
    const getAreas = () => prisma.area.findMany({
        skip,
        take,
        where: {active: true}
    })
    const getCount = () => prisma.area.count()
    const [areas, count] = await Promise.allSettled([getAreas(), getCount()])
    //check if all promises are fulfilled
    if (areas.status !== 'fulfilled') {
        throw new Error('unable to get areas')
    }
    if (count.status !== 'fulfilled') {
        throw new Error('unable to get areas count')
    }
    return {data: {areas: areas.value, count: count.value}}
}