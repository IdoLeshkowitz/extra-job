import mongoose from 'mongoose'
import * as process from "process";

export async function connect() {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error('database url not found')
        }
        await mongoose.connect(process.env.DATABASE_URL)
        mongoose.set('strictQuery', false)
    } catch (err) {
        console.error(err)
    }
}
