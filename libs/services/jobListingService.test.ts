import {describe, expect, test, vi} from "vitest";
import prisma from "../__mocks__/prisma";
import {countJobListings, createJobListing, getUniqueJobListing, updateJobListing} from "./jobListingService";
import {Prisma} from "@prisma/client";
import JobListingUpdateArgs = Prisma.JobListingUpdateArgs;


vi.mock('../prisma')

describe('professionService', () => {
    test('countJobListings', async () => {
        prisma.jobListing.count.mockResolvedValueOnce(1)
        const count = await countJobListings({where: {active: true}});
        expect(count).toMatchObject({data: {count: 1}});
    })
    test('countJobListings error', async () => {
        prisma.jobListing.count.mockRejectedValueOnce(new Error("error"))
        const count = await countJobListings({where: {active: true}});
        expect(count).toMatchObject({error: {message: "error"}});
    })
    test('createJobListing', async () => {
        const newJobListing = {name: "center8", active: true, areaId: "1", description: "center8", jobRequirements: [], likedByIds: [], positionScopeId: '1', professionId: '1', serialNumber: '1'};
        prisma.jobListing.create.mockResolvedValueOnce({name: "center8", active: true, createdAt: new Date(), id: "1", areaId: "1", description: "center8", jobRequirements: [], positionScopeId: '1', professionId: '1', serialNumber: '1'})
        const created = await createJobListing({
            area           : {connect: {id: newJobListing.areaId}},
            description    : newJobListing.description,
            jobRequirements: newJobListing.jobRequirements,
            name           : newJobListing.name,
            positionScope  : {connect: {id: newJobListing.positionScopeId}},
            profession     : {connect: {id: newJobListing.professionId}},
            serialNumber   : newJobListing.serialNumber,
        });
        expect(created).toMatchObject({data: {jobListing: {name: "center8", active: true}}});
    })
    test('createJobListing error', async () => {
//TODO
    })
    test('updateJobListing', async () => {
        const jobListingUpdateInput: JobListingUpdateArgs = {
            where: {id: "1"},
            data : {
                active       : false,
                area         : {connect: {id: "1"}},
                name         : "center8",
                positionScope: {connect: {id: "1"}},
                profession   : {connect: {id: "1"}},
                serialNumber : "1",
            },
        }
        prisma.jobListing.update.mockResolvedValueOnce({name: "center8", active: false, createdAt: new Date(), id: "1", areaId: "1", description: "center8", jobRequirements: [], positionScopeId: '1', professionId: '1', serialNumber: '1'})
        const updated = await updateJobListing(jobListingUpdateInput);
        expect(updated).toMatchObject({data: {jobListing: {name: "center8", active: false}}});
    })
    test('updateJobListing error', async () => {
        const jobListingUpdateInput: JobListingUpdateArgs = {
            where: {id: "1"},
            data : {
                active       : false,
                area         : {connect: {id: "1"}},
                name         : "center8",
                positionScope: {connect: {id: "1"}},
                profession   : {connect: {id: "1"}},
                serialNumber : "1",
            },
        }
        prisma.jobListing.update.mockRejectedValueOnce(new Error("error"))
        const updated = await updateJobListing(jobListingUpdateInput);
        expect(updated).toMatchObject({error: {message: "error"}});
    })
    test('getJobListingById', async () => {
        prisma.jobListing.findUnique.mockResolvedValueOnce({name: "center8", active: false, createdAt: new Date(), id: "1", areaId: "1", description: "center8", jobRequirements: [], positionScopeId: '1', professionId: '1', serialNumber: '1'})
        const jobListing = await getUniqueJobListing({
            where: {id: "1"},
        });
        expect(jobListing).toMatchObject({data: {jobListing: {name: "center8", active: false}}});
    })
    test('getJobListingById error', async () => {
        prisma.jobListing.findUnique.mockRejectedValueOnce(new Error("error"))
        const jobListing = await getUniqueJobListing({
            where: {id: "1"},
        });
        expect(jobListing).toMatchObject({error: {message: "error"}});
    })
})
