import {Prisma} from ".prisma/client";
import prisma from "../libs/prisma";
import AreaCreateInput = Prisma.AreaCreateInput;
import ProfessionCreateInput = Prisma.ProfessionCreateInput;
import PositionScopeCreateInput = Prisma.PositionScopeCreateInput;
import JobListingCreateInput = Prisma.JobListingCreateInput;

const mockAreas: AreaCreateInput[] = [
    {name: 'מרכז'},
    {name: 'ירושלים'},
    {name: 'צפון'},
    {name: 'דרום'},
]
const mockProfessions: ProfessionCreateInput[] = [
    {name: 'מזון'},
    {name: 'מכירות'},
    {name: 'אדמיניסטרציה'},
    {name: 'לוגיסטיקה'},
]
const mockPositionScopes: PositionScopeCreateInput[] = [
    {name: 'משרה מלאה'},
    {name: 'משרה חלקית'},
    {name: 'משרה זמנית'},
]
const mockJobListings: JobListingCreateInput[] = [
    {
        name         : 'דרוש טבח למסעדה במרכז הארץ',
        description  : 'למסעדה מוכרת במרכז הארץ דרוש טבח עם ניסיון. עבודה בפס חם וקר.',
        area         : {connect: {name: 'מרכז'}},
        profession   : {connect: {name: 'מזון'}},
        positionScope: {connect: {name: 'משרה מלאה'}},
        serialNumber : '1111',
        active       : true
    },
    {
        name         : 'דרוש מנהל פרויקטים לחברה בירושלים',
        description  : 'לחברה בירושלים דרוש מנהל פרויקטים עם ניסיון בניהול פרויקטים ובקשר עם לקוחות. עבודה בפס חם וקר.',
        area         : {connect: {name: 'ירושלים'}},
        profession   : {connect: {name: 'אדמיניסטרציה'}},
        positionScope: {connect: {name: 'משרה מלאה'}},
        serialNumber : '2222',
    },
    {
        name         : 'דרוש מוקדן מכירות למרכז מכירות טלפוני בירושלים',
        description  : 'למרכז מכירות טלפוני בירושלים דרוש מוקדן מכירות עם ניסיון במכירות טלפוניות. עבודה בפס חם וקר.',
        area         : {connect: {name: 'ירושלים'}},
        profession   : {connect: {name: 'מכירות'}},
        positionScope: {connect: {name: 'משרה מלאה'}},
        serialNumber : '3333',
    },
    {
        name         : 'דרוש עובד לקו חלוקת מזון בצפון',
        description  : 'לחברה בצפון דרוש עובד לקו חלוקת מזון עם ניסיון בחלוקת מזון. עבודה בפס חם וקר.',
        area         : {connect: {name: 'צפון'}},
        profession   : {connect: {name: 'מזון'}},
        positionScope: {connect: {name: 'משרה חלקית'}},
        serialNumber : '4444',
    },
]

async function resetDb() {
    await prisma.jobApplication.deleteMany({})
    await prisma.jobListing.deleteMany({})
    await prisma.area.deleteMany({})
    await prisma.profession.deleteMany({})
    await prisma.positionScope.deleteMany({})
}

async function seed() {
    await prisma.area.createMany({
        data: mockAreas
    })
    await prisma.profession.createMany({
        data: mockProfessions
    })
    await prisma.positionScope.createMany({
        data: mockPositionScopes
    })
    for (const jobListing of mockJobListings) {
        await prisma.jobListing.create({
            data: jobListing
        })
    }
}

(async function main() {
    await resetDb()
    console.log('DB reset')
    await seed()
    console.log('DB seeded')
    await prisma.$disconnect()
})()