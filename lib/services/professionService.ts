import prisma from "@/lib/prisma";
import {Prisma} from ".prisma/client";
import {Profession} from "@prisma/client";
import {notFound} from "next/navigation";
import {cache} from "react";


export const createProfession = async (professionToCreate: Prisma.ProfessionCreateInput): Promise<{ data: { profession: Profession } }> => {
    try {
        /*
            if profession with the same name exists, updates its status to active
            else creates a new profession
        */
        const profession = await prisma.profession.upsert({
            where : {name: professionToCreate.name},
            update: {active: true},
            create: professionToCreate
        });
        return {data: {profession}}
    } catch (e) {
        console.error(e);
        return notFound();
    }
}

export const countProfessions = cache(async ({active}: { active: boolean | undefined }): Promise<{ data: { count: number } }> => {
    try {
        const count = await prisma.profession.count({
            where: {active: active ? active : undefined}
        });
        return {data: {count}}
    } catch (e) {
        console.error(e);
        return notFound();
    }
})

export const getProfessions = cache(async ({skip, take, active}: { skip: number | undefined, take: number | undefined, active: boolean | undefined }): Promise<{ data: { professions: Profession[] } }> => {
    try {
        const professions = await prisma.profession.findMany({
            skip,
            take,
            where: {active: active ? active : undefined}
        });
        return {data: {professions}}
    } catch (e) {
        console.error(e);
        return notFound();
    }
})

export const updateProfession = async (id: string, professionToUpdate: Prisma.ProfessionUpdateInput): Promise<{ data: { profession: Profession } }> => {
    try {
        const profession = await prisma.profession.update({
            where: {id},
            data : professionToUpdate
        });
        return {data: {profession}}
    } catch (e) {
        console.error(e);
        return notFound();
    }
}