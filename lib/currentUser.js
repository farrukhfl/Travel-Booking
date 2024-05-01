import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import db from "./db";
import { NextResponse } from "next/server";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!user) {
      return null;
    }
        const {password, ...currentUser} = user
    return currentUser
  } catch (error) {
    console.log(error);
  }
}
