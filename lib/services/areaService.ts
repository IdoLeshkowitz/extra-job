import prisma from "../prisma";
import {Area, Prisma} from "@prisma/client";
import {notFound} from "next/navigation";
import {cache} from "react";


export const createArea = async (areaToCreate: Prisma.AreaCreateInput) => {
    try {
        /*
        if area with the same name exists, updates its status to active
        else creates a new area
         */
        const area = await prisma.area.upsert({
            where : {name: areaToCreate.name},
            update: {active: true},
            create: areaToCreate
        });
        return {data: {area}};
    } catch (e: any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
            return {error: {message: "קיים אזור עם שם זהה"}};
        }
        return {error: {message: e.toString()}};
    }
}

export const countAreas = cache(async ({active}: { active: boolean | undefined }): Promise<{ data: { count: number } }> => {
        try {

            const count = await prisma.area.count({
                where: {active: active ? active : undefined}
            });
            return {data: {count}}
        } catch (e) {
            console.error(e);
            return notFound();
        }
    }
)

export const getAreas = cache(async ({skip, take, active}: { skip: number | undefined, take: number | undefined, active: boolean | undefined }): Promise<{ data: { areas: Area[] } }> => {
    try {
        const areas = await prisma.area.findMany({
            skip,
            take,
            where: {active: active ? active : undefined}
        });
        return {data: {areas}}
    } catch (e) {
        console.error(e);
        return notFound();
    }
})


export const updateArea = async (id: string, areaToUpdate: Prisma.AreaUpdateInput) => {
    try {
        const area = await prisma.area.update({
            where: {id},
            data : areaToUpdate
        });
        return {data: {area}};
    } catch (e: any) {
        console.error(e);
        return {error: {message: e.toString()}};
    }
}
