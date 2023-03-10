import prisma from "../prisma";
import {Area, Prisma} from "@prisma/client";
import AreaUpdateInput = Prisma.AreaUpdateInput;


export async function createArea(areaToCreate: Prisma.AreaCreateInput): Promise<{ data: { area: Area } }> {
    const area = await prisma.area.create({
        data: areaToCreate,
    });
    return {data: {area}};
}

export async function updateArea(id: string, data: AreaUpdateInput): Promise<{ data: { areas: Area } }> {
    const updatedArea = await prisma.area.update({
        where: {id},
        data,
    });
    return {data: {areas: updatedArea}};
}

export async function getActiveAreasByRange({
                                                skip,
                                                take
                                            }: { skip: number, take: number }): Promise<{ data: { areas: Area[] } }> {
    const areas = await prisma.area.findMany({
        skip,
        take,
        where: {active: true}
    })
    return {data: {areas}}
}

export async function getAllActiveAreas(): Promise<{ data: { areas: Area[] } }> {
    const areas = await prisma.area.findMany({
        where: {active: true}
    })
    return {data: {areas}}
}

export async function getAreaByName(name: string): Promise<{ data: { area: Area | null } }> {
    const area = await prisma.area.findUnique({
        where: {name}
    });
    return {data: {area}}
}

export async function countAreas({active}: { active: boolean | undefined }): Promise<{ data: { count: number } }> {
    const count = await prisma.area.count({
        where: {active: active ? active : undefined}
    });
    return {data: {count}}
}

export async function getAreas({skip, take, active}: { skip: number | undefined, take: number | undefined, active: boolean | undefined }): Promise<{ data: { areas: Area[] } }> {
    const areas = await prisma.area.findMany({
        skip,
        take,
        where: {active: active ? active : undefined}
    });
    return {data: {areas}}
}
