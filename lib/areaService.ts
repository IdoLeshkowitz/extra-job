import {Prisma} from "@prisma/client";
import {date, InferType, object, ObjectSchema, string} from "yup";
import prisma from './client'
import AreaSelect = Prisma.AreaSelect;

const AreaSelect = {id: true, name: true, createdAt: true}satisfies Prisma.AreaSelect
const schema = object({
    name: string().required(),
    id: string(),
    createdAt: date()
})satisfies ObjectSchema<Prisma.AreaCreateInput>

export type AreaCreationSchema = InferType<typeof schema>
export type AreaPayload = Prisma.AreaGetPayload<{ select: AreaSelect }>

export async function getAllAreas() {
    try {
        return await prisma?.area.findMany({select: AreaSelect})
    } catch (e) {
        throw new Error('failed to get all areas')
    }
}

export async function createArea(areaToCreate: AreaCreationSchema) {
    try {
        return await prisma?.area.create({data: areaToCreate, select: AreaSelect})
    } catch (e) {
        throw new Error('failed to create area')
    }
}

