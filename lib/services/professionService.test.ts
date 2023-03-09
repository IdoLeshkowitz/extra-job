import {beforeEach,afterAll,describe,it,expect} from "vitest";
import prisma from "../prisma";
import {createProfession} from "./professionService";
import {Prisma} from "@prisma/client";
import ProfessionCreateInput = Prisma.ProfessionCreateInput;

beforeEach(async () => {
    // Reset the database before each test
    await prisma.profession.deleteMany()
})

afterAll(async () => {
    await prisma.profession.deleteMany()
})

describe('createProfession', () => {
    it('should create a profession', async () => {
        const profession = await createProfession({
            name: 'test profession',
            active: true,
            createdAt: new Date()
        })
        expect(profession.name).toBe('test profession')
    })
    it('should activate a profession if it already exists', async () => {
        const profession : ProfessionCreateInput ={name: 'test profession', active: false, createdAt: new Date()}
        await createProfession(profession)
        const final = await createProfession(profession)
        expect(final.active).toBe(true)
    })
})