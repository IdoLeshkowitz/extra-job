import prisma from "@/lib/prisma";
import {Prisma} from ".prisma/client";
import {Profession} from "@prisma/client";
import ProfessionUpdateInput = Prisma.ProfessionUpdateInput;

export async function createProfession(professionToCreate: Prisma.ProfessionCreateInput): Promise<{ data: { profession: Profession } }> {
    const profession = await prisma.profession.create({
        data: professionToCreate,
    });
    return {data: {profession}};
}

export async function updateProfession(id: string, data: ProfessionUpdateInput): Promise<{ data: { professions: Profession } }> {
    const updatedProfession = await prisma.profession.update({
        where: {id},
        data,
    });
    return {data: {professions: updatedProfession}};
}

export async function getProfessionByName(name: string): Promise<{ data: { profession: Profession | null } }> {
    const profession = await prisma.profession.findUnique({
        where: {name}
    });
    return {data: {profession}}
}

export async function countProfessions({active}: { active: boolean | undefined }): Promise<{ data: { count: number } }> {
    const count = await prisma.profession.count({
        where: {active: active ? active : undefined}
    });
    return {data: {count}}
}

export async function getProfessions({skip, take, active}: { skip: number | undefined, take: number | undefined, active: boolean | undefined }): Promise<{ data: { professions: Profession[] } }> {
    const professions = await prisma.profession.findMany({
        skip,
        take,
        where: {active: active ? active : undefined}
    });
    return {data: {professions}}
}