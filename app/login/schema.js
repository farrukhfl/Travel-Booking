import {z} from "zod"
const schema = z.object({
    email: z.string().min(1,{message: "Email is required"}).email("Invalid Email address"),
    password: z.string().min(6, {message: "Password must be atleast 6 characters long"})
})
export {schema}