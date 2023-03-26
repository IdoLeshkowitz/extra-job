import {describe, expect, test, vi} from "vitest";
import prisma from "../__mocks__/prisma";
import {
    countPositionScopes,
    getPositionScopes,
    updatePositionScope,
    upsertPositionScope
} from "./positionScopeService";

vi.mock('../prisma')

describe('positionScopeService', () => {
    test('getPositionScopes', async () => {
        prisma.positionScope.findMany.mockResolvedValueOnce([{name: "center8", active: true, createdAt: new Date(), id: "1"}])
        const positionScopes = await getPositionScopes({where: {active: true}});
        expect(positionScopes).toMatchObject({data: {positionScopes: [{name: "center8", active: true}]}})
    })
    test('getPositionScope error', async () => {
        prisma.positionScope.findMany.mockRejectedValueOnce(new Error("error"))
        const positionScopes = await getPositionScopes({where: {active: true}});
        expect(positionScopes).toMatchObject({error: {message: "error"}});
    })
    test('upsertPositionScope', async () => {
        const newPositionScope = {name: "center8"};
        prisma.positionScope.upsert.mockResolvedValueOnce({name: "center8", active: true, createdAt: new Date(), id: "1"})
        const created = await upsertPositionScope(newPositionScope);
        expect(created).toMatchObject({data: {positionScope: {name: "center8", active: true}}});
    })
    test('upsertPositionScope error', async () => {
        const newPositionScope = {name: "center8"};
        prisma.positionScope.upsert.mockRejectedValueOnce(new Error("error"))
        const created = await upsertPositionScope(newPositionScope);
        expect(created).toMatchObject({error: {message: "error"}});
    })
    test('updatePositionScope', async () => {
        prisma.positionScope.update.mockResolvedValueOnce({name: "center8", active: false, createdAt: new Date(), id: "1"})
        const updatedPositionScope = await updatePositionScope({where: {id: "1"}, data: {active: false}});
        expect(updatedPositionScope).toMatchObject({data: {positionScope: {name: "center8", active: false}}});
    })
    test('updatePositionScope error', async () => {
        prisma.positionScope.update.mockRejectedValueOnce(new Error("error"))
        const updatedPositionScope = await updatePositionScope({where: {id: "1"}, data: {active: false}});
        expect(updatedPositionScope).toMatchObject({error: {message: "error"}});
    })
    test('countPositionScopes', async () => {
        prisma.positionScope.count.mockResolvedValueOnce(1)
        const count = await countPositionScopes({where: {active: true}});
        expect(count).toMatchObject({data: {count: 1}})
    })
    test('countPositionScopes error', async () => {
        prisma.positionScope.count.mockRejectedValueOnce(new Error("error"))
        const count = await countPositionScopes({where: {active: true}});
        expect(count).toMatchObject({error: {message: "error"}});
    })
})
