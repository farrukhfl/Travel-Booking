const { NextResponse } = require("next/server")
const { getCurrentUser } = require("./currentUser")

const isAdminUser = async() => {
    try {
        const currentUser = await getCurrentUser()

        if(!currentUser?.isAdmin) return NextResponse.error({message: "You are not an admin"}, {status: 403})
    } catch (error) {
        console.log(error)
    }
}
export default isAdminUser