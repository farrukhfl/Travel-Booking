'use client'
import Paris from "@/public/assets/paris.jpg";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { schema } from "./schema";
import { useState } from "react";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";


const Login = () => {
const [isLoading, setIsLoading] = useState(false)
const router = useRouter()
const {register, handleSubmit, formState : {errors}}= useForm({
  resolver: zodResolver(schema)
})

const onSubmit = async(data) => {
  if(Object.keys(errors)?.length > 0){
    toast.error("Enter valid data")
    return
  }
  setIsLoading(true)

  try {
    const res = await signIn("credentials", {...data, redirect: false})
    if(res?.error == null){
      router.push("/")
    }else{
      toast.error("Email or Password is Invalid")
    }
  } catch (error) {
    console.log(error)
  }
setIsLoading(false)
}

  return (
    <div className="relative h-screen w-full">
        <div className="relative h-full w-full">
        <Image
          src={Paris}
          className="brightness-50 object-cover h-full w-full"
        />
    <div className="h-[350px] w-[400px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
          <h2 className="text-center p-4 font-semibold text-slate-800 text-2xl border-b border-slate-500">
            Login to your account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col w-full gap-8 items-center">
          <Input type="email" register={register("email")} placeholer="Farrukh123@gmail.com" className="w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600"/>
          <Input type="password" register={register("password")} placeholer="*********" className="w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600"/>
          <Button disabled={isLoading} label="Submit" className="w-3/4 mx-auto mt-12 cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-700" />

    </form>
        </div>
        </div>
      
    </div>
  )
}

export default Login
