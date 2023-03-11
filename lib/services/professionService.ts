import prisma from "../prisma";
import {Prisma, Profession} from "@prisma/client";
import ProfessionUpdateInput = Prisma.ProfessionUpdateInput;

export async function createProfession(data: Prisma.ProfessionCreateInput): Promise<{ data: { profession: Profession } }> {
    //check if profession already exists
    const response = await getProfessionByName(data.name);
    const {profession} = response.data;
    //if profession exists activate it
    if (profession) {
        const professionUpdateInput: ProfessionUpdateInput = {
            createdAt: profession.createdAt,
            name: profession.name,
            active: true
        }
        const updatedProfession = await updateProfession(profession.id, professionUpdateInput);
        return {data: {profession: updatedProfession}};
    }
    //if profession does not exist create it
    const addedProfession = await prisma.profession.create({
        data,
    });
    return {data: {profession: addedProfession}}
}

export async function updateProfession(id: string, data: ProfessionUpdateInput): Promise<Profession> {
    const updatedProfession = await prisma.profession.update({
        where: {id},
        data,
    });
    return updatedProfession;
}

export async function getSomeActiveProfessionsAndCount({skip, take}: { skip: number, take: number }) {
    /*
    * return {data : {professions: Profession[], count: number}}
    * */
    const getSomeActiveProfessions = () => prisma.profession.findMany({
        skip,
        take,
        where: {active: true}
    })
    const countAllActiveProfessions = () => prisma.profession.count({where: {active: true}})
    const [professions, count] = await Promise.allSettled([getSomeActiveProfessions(), countAllActiveProfessions()])
    //check if all promises are fulfilled
    if (professions.status !== 'fulfilled') {
        return Promise.reject({error: {message: 'unable to get professions'}})
    }
    if (count.status !== 'fulfilled') {
        return Promise.reject({error: {message: 'unable to get count'}})
    }
    return {data: {professions: professions.value, count: count.value}}
}

export async function getProfessionByName(name: string): Promise<{ data: { profession: Profession | null } }> {
    const profession = await prisma.profession.findUnique({
        where: {name}
    });
    return {data: {profession}}
}
