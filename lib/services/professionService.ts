import prisma from "../prisma";
import {Prisma} from "@prisma/client";
import ProfessionUpdateInput = Prisma.ProfessionUpdateInput;

export async function createProfession(data: Prisma.ProfessionCreateInput) {
    //check if profession already exists
    const professionExists = await prisma.profession.findFirst({
        where: {
            name: data.name
        }
    })
    //if profession exists activate it
    if (professionExists) {
        const professionUpdateInput: ProfessionUpdateInput = {
            createdAt: professionExists.createdAt,
            name: professionExists.name,
            active: true
        }
        const updatedProfession = await updateProfession(professionExists.id, professionUpdateInput);
        return updatedProfession;
    }
    //if profession does not exist create it
    const addedProfession = await prisma.profession.create({
        data,
    });
    return addedProfession;
}

export async function updateProfession(id: string, data: ProfessionUpdateInput) {
    const updatedProfession = await prisma.profession.update({
        where: {id},
        data,
    });
    return updatedProfession;
}

export async function getProfessionsAndCount({skip, take}: { skip: number, take: number }) {
    /*
    * return {data : {professions: Profession[], count: number}}
    * */
    const getProfessions = () => prisma.profession.findMany({
        skip,
        take,
        where: {active: true}
    })
    const getCount = () => prisma.profession.count()
    const [professions, count] = await Promise.allSettled([getProfessions(), getCount()])
    //check if all promises are fulfilled
    if (professions.status !== 'fulfilled') {
        throw new Error('unable to get professions')
    }
    if (count.status !== 'fulfilled') {
        throw new Error('unable to get professions count')
    }
    return {data: {professions: professions.value, count: count.value}}
}