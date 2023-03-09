import prisma from "../prisma";
import {afterAll, beforeEach, describe, expect, test} from 'vitest'
import {createArea, getAreasAndCount, updateArea,} from "./areaService";


beforeEach(async () => {
    await prisma.area.deleteMany();
})

// afterAll(async () => {
//     await prisma.area.deleteMany()
// })
describe('createArea', () => {
    test('creating one area', async () => {
        const addedArea = await createArea({name: 'test'});
        expect(addedArea).toMatchObject({
            name: 'test',
            active: true,
            createdAt: expect.any(Date),
            id: expect.any(String),
        })
    })
    test('create area with same name as deactivated area', async () => {
        const addedArea = await createArea({name: 'testa'});
        const deactivatedArea = await updateArea(addedArea.id, {active: false});
        const addedArea2 = await createArea({name: 'test'});
        expect(addedArea2).toMatchObject({
            name: 'test',
            active: true,
            createdAt: expect.any(Date),
            id: expect.any(String),
        })
    })
})

describe('update area', () => {
    test('deactivate area', async () => {
        const addedArea = await createArea({name: 'test'});
        const deactivatedArea = await updateArea(addedArea.id, {active: false});
        expect(deactivatedArea).toMatchObject({
            name: 'test',
            active: false,
            createdAt: expect.any(Date),
            id: expect.any(String),
        })
    })
})

describe('getAreasAndCount', () => {
    test('get areas and count', async () => {
        const addedArea = await createArea({name: 'test'});
        const addedArea3 = await createArea({name: 'test3'});
        const {data} = await getAreasAndCount({skip: 0, take: 10});
        expect(data).toMatchObject({
            areas: expect.arrayContaining([
                expect.objectContaining({
                    name: 'test',
                    active: true,
                    createdAt: expect.any(Date),
                    id: expect.any(String),
                }),
                expect.objectContaining({
                    name: 'test3',
                    active: true,
                    createdAt: expect.any(Date),
                    id: expect.any(String),
                })
            ]),
            count: 2
        })
    })
})

