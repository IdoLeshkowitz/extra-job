import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import Area from "./schema";
import {createArea, getAllAreas} from "./crud";

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri, {})
})
afterAll(async () => {
    await mongoose.connection.close()
    await mongoServer.stop()
})
afterEach(async () => {
    await Area.deleteMany()
})
describe('area crud', () => {
    test('getAllAreas', async () => {
        const areaToCreate = {name: "test"}
        await Area.create(areaToCreate)
        const area = getAllAreas()
        expect(area).toEqual(area)
    })
    test('deleteAreaById', async () => {
        const areaToCreate = {name: "test"}
        const area = await Area.create(areaToCreate)
        await Area.findByIdAndDelete(area._id)
        expect(area).toEqual(area)
    })
    test('createArea', async () => {
        const areaToCreate = {name: "test"}
        const area = await createArea(areaToCreate)
        expect(area).toEqual(area)
    })
})
