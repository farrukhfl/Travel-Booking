import { getCurrentUser } from "@/lib/currentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req, ctx){
    try {
        const {id} = ctx.params.id
        const currentUser = await getCurrentUser()
        const reservation = await db.reservation.findUnique({
            where:{
                id
            },
            include:{
                user: true
            }
        })
        if(reservation.user.id !== currentUser.id && !currentUser.isAdmin){
            return NextResponse.error({
                message: "User has no permission to cancel the reservations"
            })
        }
        await db.reservation.delete({
            where: {
                id
            }
        })
        return NextResponse.json({message: "Successfully delete the reservation of id" + id}, {status: 200})
    } catch (error) {
        return NextResponse.error(error)
    }
}