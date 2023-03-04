import {NextRequest, NextResponse} from "next/server";
import {NextApiResponse} from "next";

export async function GET(request: NextRequest,{params}:{params : {slug : string}}) {
    return NextResponse.json({data : params.slug});
}