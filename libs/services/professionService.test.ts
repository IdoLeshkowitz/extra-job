import {describe, expect, test, vi} from "vitest";
import prisma from "../__mocks__/prisma";
import {countProfessions, getProfessions, updateProfession, upsertProfession} from "./professionService";

vi.mock('../prisma')

describe('professionService', () => {
    test('getProfessions', async () => {
        const newProfession = {name: "center8"};
        prisma.profession.upsert.mockResolvedValueOnce({name: "center8", active: true, createdAt: new Date(), id: "1"})
        const created = await upsertProfession(newProfession);
        expect(created).toMatchObject({data: {profession: {name: "center8", active: true}}});
    })
    test('getProfession error', async () => {
        const newProfession = {name: "center8"};
        prisma.profession.upsert.mockRejectedValueOnce(new Error("error"))
        const created = await upsertProfession(newProfession);
        expect(created).toMatchObject({error: {message: "error"}});
    })
    test('upsertProfession', async () => {
        prisma.profession.findMany.mockResolvedValueOnce([{name: "center8", active: true, createdAt: new Date(), id: "1"}])
        const professions = await getProfessions({where: {active: true}});
        expect(professions).toMatchObject({data: {professions: [{name: "center8", active: true}]}});
    })
    test('upsertProfession error', async () => {
        prisma.profession.findMany.mockRejectedValueOnce(new Error("error"))
        const professions = await getProfessions({where: {active: true}});
        expect(professions).toMatchObject({error: {message: "error"}});
    })
    test('updateProfession', async () => {
        prisma.profession.update.mockResolvedValueOnce({name: "center8", active: false, createdAt: new Date(), id: "1"})
        const updatedProfession = await updateProfession({where: {id: "1"}, data: {active: false}});
        expect(updatedProfession).toMatchObject({data: {profession: {name: "center8", active: false}}});
    })
    test('updateProfession error', async () => {
        prisma.profession.update.mockRejectedValueOnce(new Error("error"))
        const updatedProfession = await updateProfession({where: {id: "1"}, data: {active: false}});
        expect(updatedProfession).toMatchObject({error: {message: "error"}});
    })
    test('countProfessions', async () => {
        prisma.profession.count.mockResolvedValueOnce(1)
        const count = await countProfessions({where: {active: true}});
        expect(count).toMatchObject({data: {count: 1}});
    })
    test('countProfessions error', async () => {
        prisma.profession.count.mockRejectedValueOnce(new Error("error"))
        const count = await countProfessions({where: {active: true}});
        expect(count).toMatchObject({error: {message: "error"}});
    })
})