import prisma from "../prisma";
import {Prisma} from "@prisma/client";
import {CustomError} from "@/types/error";
import ProfessionCountArgs = Prisma.ProfessionCountArgs;
import ProfessionFindManyArgs = Prisma.ProfessionFindManyArgs;
import ProfessionUpdateArgs = Prisma.ProfessionUpdateArgs;


export const upsertProfession = async (professionUpsertArgs: Prisma.ProfessionUpsertArgs) => {
    try {
        /*
            if profession with the same name exists, updates its status to active
            else creates a new profession
        */
        const profession = await prisma.profession.upsert(professionUpsertArgs);
        return {data: {profession}}
    } catch (e: any) {
        console.error(e);
        return {error: {message: e.message, code: e.code} as CustomError}
    }
}

export const countProfessions = async (professionCountArgs: ProfessionCountArgs) => {
    try {
        const count = await prisma.profession.count(professionCountArgs);
        return {data: {count}}
    } catch (e: any) {
        console.error(e);
        return {error: {message: e.message, code: e.code} as CustomError}
    }
}

export const getProfessions = async (professionFindManyInput: ProfessionFindManyArgs) => {
    try {
        const professions = await prisma.profession.findMany(professionFindManyInput);
        return {data: {professions}}
    } catch (e: any) {
        console.error(e);
        return {error: {message: e.message, code: e.code} as CustomError}
    }
}

export const updateProfession = async (professionUpdateArgs: ProfessionUpdateArgs) => {
    try {
        const profession = await prisma.profession.update(professionUpdateArgs);
        return {data: {profession}}
    } catch (e: any) {
        console.error(e);
        return {error: {message: e.message, code: e.code} as CustomError}
    }
}