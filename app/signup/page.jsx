'use client'
import Image from "next/image";
import React from "react";
import Dubai from "@/public/assets/dubai.jpg";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { useRouter } from "next/navigation";
import AXIOS_API from "@/utils/axiosAPI";
import toast from "react-hot-toast";

const SignUp = () => {

  const {register, handleSubmit, formState : {errors}}= useForm({
    resolver: zodResolver(schema)
  })

  const router = useRouter()
  const onSubmit = async(data) => {

    if(Object.keys(errors)?.length > 0){
      toast.error("Enter valid data")
      return
    }

    try {
      await AXIOS_API.post('/register', data)
      toast.success("Success Redirecting to Login")

      setTimeout(()=> {
        router.push("/login")
      }, 2500)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="relative h-screen w-full">
      <div className="relative h-full w-full">
        <Image
          src={Dubai}
          className="brightness-50 object-cover h-full w-full"
        />
        <div className="h-[450px] w-[400px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
          <h2 className="text-center p-4 font-semibold text-slate-800 text-2xl border-b border-slate-500">
            Create an account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-12 flex items-center flex-col w-full gap-8">
    <Input type="text" register={register("username")} placeholer="Farrukh123" className="w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600"/>
    <Input type="email" register={register("email")} placeholer="Farrukh123@gmail.com" className="w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600"/>
    <Input type="password" register={register("password")} placeholer="*********" className="w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600"/>
    <Button label="Submit" className="w-3/4 mx-auto mt-12 cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-700" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
