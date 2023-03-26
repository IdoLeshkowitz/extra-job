import {beforeAll, describe, expect, test} from "vitest";
import prisma from "../libs/prisma";
import {countAreas, getAreas, updateArea, upsertArea} from "../libs/services/areaService";
import {countProfessions, getProfessions, updateProfession, upsertProfession} from "../libs/services/professionService";

async function resetDb() {
    await prisma.jobApplication.deleteMany();
    await prisma.jobListing.deleteMany();
    await prisma.area.deleteMany();
    await prisma.profession.deleteMany();
    await prisma.positionScope.deleteMany();
}

describe("flow", () => {

})