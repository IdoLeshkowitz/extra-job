import prisma from "@/lib/prisma";
import {Prisma} from ".prisma/client";
import {PositionScope} from "@prisma/client";
import {notFound} from "next/navigation";
import {cache} from "react";

export const createPositionScope = async (positionScopeToCreate: Prisma.PositionScopeCreateInput): Promise<{ data: { positionScope: PositionScope } }> => {
    try {
        /*
          if positionScope with the same name exists, updates its status to active
             else creates a new positionScope
         */
        const positionScope = await prisma.positionScope.upsert({
            where : {name: positionScopeToCreate.name},
            update: {active: true},
            create: positionScopeToCreate
        });
        return {
            data: {positionScope}
        }
    } catch (e) {
        console.error(e);
        return notFound();
    }
}

export const countPositionScopes = cache(async ({active}: { active: boolean | undefined }): Promise<{ data: { count: number } }> => {
    try {
        const count = await prisma.positionScope.count({
            where: {active: active ? active : undefined}
        });
        return {data: {count}}
    } catch (e) {
        console.error(e);
        return notFound();
    }
})

export const getPositionScopes = cache(async ({skip, take, active}: { skip: number | undefined, take: number | undefined, active: boolean | undefined }): Promise<{ data: { positionScopes: PositionScope[] } }> => {
    try {
        const positionScopes = await prisma.positionScope.findMany({
            skip,
            take,
            where: {active: active ? active : undefined}
        });
        return {data: {positionScopes}}
    } catch (e) {
        console.error(e);
        return notFound();
    }
})

export const updatePositionScope = async (id: string, positionScopeToUpdate: Prisma.PositionScopeUpdateInput): Promise<{ data: { positionScope: PositionScope } }> => {
    try {
        const positionScope = await prisma.positionScope.update({
            where: {id},
            data : positionScopeToUpdate
        })
        return {data: {positionScope}}
    } catch (e) {
        console.error(e);
        return notFound();
    }
}