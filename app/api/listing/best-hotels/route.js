import db from "@/lib/db";
import { NextResponse } from "next/server";
import {calcAndSortedListings} from "@/lib/sortListings"

export async function GET(req){
    try {
        const listings = await db.listing.findMany({
            include:{
                reviews: true
            }
        })
        const sortedListings =  calcAndSortedListings(listings).slice(0,4)
    } catch (error) {
        return NextResponse.error(error)
    }
}