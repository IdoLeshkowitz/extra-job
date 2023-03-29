import {Prisma} from ".prisma/client";
import prisma from "@/lib/prisma";
import CvFindFirstArgs = Prisma.CvFindFirstArgs;

export async function findFirstCv(cvFindFirstArgs: CvFindFirstArgs) {
    try {
        const cv = await prisma.cv.findFirst(cvFindFirstArgs)
        return {data: {cv}}
    } catch (e: any) {
        console.error(e)
        return {error: {message: e.message}}
    }
}

export async function countCv(cvCountArgs: Prisma.CvCountArgs) {
    try {
        const cvCount = await prisma.cv.count(cvCountArgs)
        return {data: {cvCount}}
    } catch (e: any) {
        console.error(e)
        return {error: {message: e.message}}
    }
}

export async function createCv(cvCreateArgs: Prisma.CvCreateArgs) {
    try {
        const cv = await prisma.cv.create(cvCreateArgs)
        return {data: {cv}}
    } catch (e: any) {
        console.error(e)
        return {error: {message: e.message}}
    }
}