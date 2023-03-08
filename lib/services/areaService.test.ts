import prisma from "../prisma";
import {beforeEach, describe, expect, test,afterAll} from 'vitest'
import {createArea, updateArea,} from "./areaService";


beforeEach(async () => {
    await prisma.area.deleteMany();
});
afterAll(async () => {
    await prisma.area.deleteMany()
})
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
    test('duplicate names prevention', async () => {
        await createArea({name: 'test'});
        expect(createArea({name: 'test'})).rejects.toThrowError();
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

