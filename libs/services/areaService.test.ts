// test/sample.test.ts
import {describe, expect, test, vi} from 'vitest'
import {countAreas, getAreas, updateArea, upsertArea} from "./areaService";
import prisma from '../__mocks__/prisma'
import {Prisma} from "@prisma/client";
import AreaUpsertArgs = Prisma.AreaUpsertArgs;

vi.mock('../prisma')
describe('areaService', () => {
    test('upsertArea', async () => {
        const areaUpsertArgs: AreaUpsertArgs = {where: {name: "center8"}, create: {name: "center8"}, update: {name: "center8"}};
        prisma.area.upsert.mockResolvedValueOnce({name: "center8", active: true, createdAt: new Date(), id: "1"})
        const created = await upsertArea(areaUpsertArgs);
        expect(created).toMatchObject({data: {area: {name: "center8", active: true}}});
    })
    test('upsertArea error', async () => {
        const areaUpsertArgs: AreaUpsertArgs = {where: {name: "center8"}, create: {name: "center8"}, update: {name: "center8"}};
        prisma.area.upsert.mockRejectedValueOnce(new Error("error"))
        const created = await upsertArea(areaUpsertArgs);
        expect(created).toMatchObject({error: {message: "error"}});
    })
    test('getAreas', async () => {
        prisma.area.findMany.mockResolvedValueOnce([{name: "center8", active: true, createdAt: new Date(), id: "1"}])
        const areas = await getAreas({where: {active: true}});
        expect(areas).toMatchObject({data: {areas: [{name: "center8", active: true}]}});
    })
    test('getAreas error', async () => {
        prisma.area.findMany.mockRejectedValueOnce(new Error("error"))
        const areas = await getAreas({where: {active: true}});
        expect(areas).toMatchObject({error: {message: "error"}});
    })
    test('updateArea', async () => {
        prisma.area.update.mockResolvedValueOnce({name: "center8", active: false, createdAt: new Date(), id: "1"})
        const updatedArea = await updateArea({where: {id: "1"}, data: {active: false}});
        expect(updatedArea).toMatchObject({data: {area: {name: "center8", active: false}}});
    })
    test('updateArea error', async () => {
        prisma.area.update.mockRejectedValueOnce(new Error("error"))
        const updatedArea = await updateArea({where: {id: "1"}, data: {active: false}});
        expect(updatedArea).toMatchObject({error: {message: "error"}});
    })
    test('countAreas', async () => {
        prisma.area.count.mockResolvedValueOnce(1)
        const count = await countAreas({where: {active: true}});
        expect(count).toMatchObject({data: {count: 1}});
    })
    test('countAreas error', async () => {
        prisma.area.count.mockRejectedValueOnce(new Error("error"))
        const count = await countAreas({where: {active: true}});
        expect(count).toMatchObject({error: {message: "error"}});
    })
})
