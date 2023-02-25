import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import Area from "./schema";

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
describe('adding area', () => {
    test('first name must be required', async () => {
        try {
            await Area.create({})
        } catch (e) {
            expect(e).toBeTruthy()
        }
    })
    test('name must be unique', async () => {
        try {
            await Area.create({name: "test"})
            await Area.create({name: "test"})
        } catch (e) {
            expect(e).toBeTruthy()
        }
    })
    test('valid area', async () => {
        const area = await Area.create({name: "test"})
        expect(area).toEqual(area)
    })
})
