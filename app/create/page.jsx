"use client";
import Input from "@/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Button from "@/ui/Button";
import toast from "react-hot-toast";
import { createNewListing, postImages } from "./api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Create = () => {
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET
    const CLOUD_NAME= process.env.NEXT_PUBLIC_CLOUD_NAME
    const router = useRouter()
    const [images, setImages] = useState([])

const {mutateAsync, isLoading} = useMutation({
    mutationFn: ({data, imageUrls}) => createNewListing(data, imageUrls),
    mutationKey: ["listings"]
})



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      desc: "",
      beds: 5,
      hasFreeWifi: false,
      type: "luxury",
      location: "dubai",
      pricePerNight: 123,
    },
  });

  useEffect(() => {
    if(Object.keys((errors)).length > 0){
        Object.keys((errors)).map((error)=>{
            toast.error(errors[key].messsage) 
        })
    }
    },[errors])


    // useEffect(() => {
    //   if (Object.keys(errors).length > 0) {
    //       Object.keys(errors).map((error) => {
    //           toast.error(errors[error].message);
    //           // Use 'error' instead of 'key'
    //       });
    //   }
  // }, [errors]);

    const handleImage = (e) => {
        setImages((prev)=>{
            return[...prev, e.target.files[0]]
        })
    }

  const uploadImage = async(image, idx) => {
    if(!image)return
    const toastId = toast.loading(`Image ${idx + 1} is being uploaded`)
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", UPLOAD_PRESET)
    try {
        const imageUrl = await postImages(CLOUD_NAME, formData)
        toast.success(`Successfully upload image ${idx + 1}`)
        toast.dismiss(toastId)

        return imageUrl
    } catch (error) {
        console.error(error)
    }
  } 

  
const onSubmit = async(data) => {
  if(!images?.length) return toast.error("You must upload an image")
  const imageUrls = await Promise.all(images.map((image, idx)=> {
          const imageUrl = uploadImage(image, idx)
          return imageUrl
  }))
  const newListing = await mutateAsync({data, imageUrls})
  toast.success("Redirecting to Listing...")
  router.push(`/details/${newListing.id}`)
}
  return (
    <div className="min-h-[900px] w-full flex items-center justify-center">
      <div className="h-2/5 w-1/5 border border-slate-300 rounded-xl">
        <div className="p-3 w-full border-b border-slate-300">
          <h3 className="text-center font-semibold text-2xl">
            Create a Listing
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-6 w-full flex flex-col items-center gap-8">
          <Input
            type="text"
            className="text-slate-400 w-2/3 outline-none p-2"
            register={register("name")}
            placeholer="Arabian Paradise"
          />
          <Input
            type="text"
            className="text-slate-400 w-2/3 outline-none p-2"
            register={register("desc")}
            placeholer="This hotel is Amazing, it has this view"
          />
          <Select
            data={optionLocations}
            className="text-slate-400 w-2/3 outline-none p-2"
            register={register("location")}
          />
          <Select
            data={optionTypes}
            className="text-slate-400 w-2/3 outline-none p-2"
            register={register("types")}
          />
          <Input
            type="number"
            className="text-slate-400 w-2/3 outline-none p-2"
            register={register("pricePerNight", { valueAsNumber: true })}
            step={0.01}
            placeholer="$249"
          />
          <Input
            type="number"
            className="text-slate-400 w-2/3 outline-none p-2"
            register={register("pricePerNight", { valueAsNumber: true })}
            step={1}
          />

          <div className="text-slate-400 flex items-center ml-4 w-2/3 gap-4">
            <label htmlFor="freeWifi">Free Wifi</label>
            <Input
              type="checkbox"
              register={register("hasFreeWifi")}           
              id="freeWifi"
              className="h-4 w-4"
            />
          </div>
          <label htmlFor="images" className="text-slate-400 w-2/3 ml-4">
            Upload Images
          </label>
          <input onChange={handleImage} id="images" type="file" className="text-slate-400" style={{display: "none"}}/>
        <Button disabled={isLoading} label="Submit" className="w-2/3 py-2 px-4 bg-blue-500 text-white disabled:bg-blue-700" />
        </form>
      </div>
    </div>
  );
};

export default Create;
