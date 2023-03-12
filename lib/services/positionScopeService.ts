import prisma from "@/lib/prisma";
import {Prisma} from ".prisma/client";
import PositionScopeUpdateInput = Prisma.PositionScopeUpdateInput;
import {PositionScope} from "@prisma/client";


export async function getPositionScopes({skip, take, active}: { skip: number | undefined, take: number | undefined, active: boolean | undefined }): Promise<{ data: { positionScopes: PositionScope[] } }> {
    const positionScopes = await prisma.positionScope.findMany({
        skip,
        take,
        where: {active: active ? active : undefined}
    });
    return {data: {positionScopes}}
}

export async function countPositionScopes({active}: { active: boolean | undefined }): Promise<{ data: { count: number } }> {
    const count = await prisma.positionScope.count({
        where: {active: active ? active : undefined}
    });
    return {data: {count}}
}

export async function createPositionScope(positionScopeToCreate: Prisma.PositionScopeCreateInput): Promise<{ data: { positionScope: PositionScope } }> {
    const positionScope = await prisma.positionScope.create({
        data: positionScopeToCreate,
    });
    return {data: {positionScope}};
}
export async function updatePositionScope(id: string, data: PositionScopeUpdateInput): Promise<{ data: { positionScopes: PositionScope } }> {
    const updatedPositionScope = await prisma.positionScope.update({
        where: {id},
        data,
    });
    return {data: {positionScopes: updatedPositionScope}};
}
export async function getPositionScopeByName(name: string): Promise<{ data: { positionScope: PositionScope | null } }> {
    const positionScope = await prisma.positionScope.findUnique({
        where: {name}
    });
    return {data: {positionScope}}
}