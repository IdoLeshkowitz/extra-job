import prisma from "../prisma";
import {Prisma} from "@prisma/client";
import {CustomError} from "@/types/error";
import PositionScopeCountArgs = Prisma.PositionScopeCountArgs;
import PositionScopeFindManyArgs = Prisma.PositionScopeFindManyArgs;
import PositionScopeUpdateArgs = Prisma.PositionScopeUpdateArgs;
import PositionScopeUpsertArgs = Prisma.PositionScopeUpsertArgs;

export const upsertPositionScope = async (positionScopeUpsertArgs: PositionScopeUpsertArgs) => {
    try {
        /*
          if positionScope with the same name exists, updates its status to active
             else creates a new positionScope
         */
        const positionScope = await prisma.positionScope.upsert(positionScopeUpsertArgs)
        return {
            data: {positionScope}
        }
    } catch (e: any) {
        console.error(e);
        return {error: {message: e.message} as CustomError}
    }
}

export const countPositionScopes = async (positionScopeCountArgs: PositionScopeCountArgs) => {
    try {
        const count = await prisma.positionScope.count(positionScopeCountArgs);
        return {data: {count}}
    } catch (e: any) {
        console.error(e);
        return {error: {message: e.message} as CustomError}
    }
}

export const getPositionScopes = async (positionScopeFindManyArgs: PositionScopeFindManyArgs) => {
    try {
        const positionScopes = await prisma.positionScope.findMany(positionScopeFindManyArgs);
        return {data: {positionScopes}}
    } catch (e: any) {
        console.error(e);
        return {error: {message: e.message} as CustomError}
    }
}

export const updatePositionScope = async (positionScopeUpdateArgs: PositionScopeUpdateArgs) => {
    try {
        const positionScope = await prisma.positionScope.update(positionScopeUpdateArgs);
        return {data: {positionScope}}
    } catch (e: any) {
        console.error(e);
        return {error: {message: e.message} as CustomError}
    }
}