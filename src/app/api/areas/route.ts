import {NextResponse} from "next/server";
import prisma from "../../../../lib/prismadb";
import {NextApiRequest} from "next";
export async function GET(request : NextApiRequest){
    return NextResponse.json({data : await prisma.area.findMany()});
}
