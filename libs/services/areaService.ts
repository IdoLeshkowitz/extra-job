import prisma from "../prisma";
import {Prisma} from "@prisma/client";
import {CustomError} from "@/types/error";
import AreaUpdateArgs = Prisma.AreaUpdateArgs;
import AreaCountArgs = Prisma.AreaCountArgs;
import AreaFindManyArgs = Prisma.AreaFindManyArgs;
import AreaUpsertArgs = Prisma.AreaUpsertArgs;


export const upsertArea = async (areaUpsertArgs: AreaUpsertArgs) => {
    try {
        /*
        if area with the same name exists, updates its status to active
        else creates a new area
         */
        const area = await prisma.area.upsert(areaUpsertArgs);
        return {data: {area}};
    } catch (e: any) {
        console.error(e);
        return {error: {message: e.message} as CustomError}
    }
}

export const countAreas = async (areaCountArgs: AreaCountArgs) => {
    try {
        const count = await prisma.area.count(areaCountArgs);
        return {data: {count}}
    } catch (e: any) {
        console.error(e);
        return {error: {message: e.message} as CustomError}
    }
}

export const getAreas = async (areaFindManyArgs: AreaFindManyArgs) => {
    try {
        const areas = await prisma.area.findMany(areaFindManyArgs);
        return {data: {areas}}
    } catch (e: any) {
        console.error(e);
        return {error: {message: e.message} as CustomError}
    }
}


export const updateArea = async (areaUpdateArgs: AreaUpdateArgs) => {
    try {
        const updatedArea = await prisma.area.update(areaUpdateArgs);
        return {data: {area: updatedArea}};
    } catch (e: any) {
        console.error(e);
        return {error: {message: e.message} as CustomError}
    }
}
