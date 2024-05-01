import React from 'react'
import { AiFillStar } from "react-icons/ai";
import person_image from "@/public/assets/bianco_2.png"
import Image from 'next/image';
import { format } from 'date-fns';


const Review = ({review}) => {
  return (
    <div className="w-full flex gap-4">
    <div className="w-full flex gap-4">
        <div className="w-14 h-14">
            <Image height={56} width={56} src={person_image} className="w-full h-full object-cover rounded-full" />
        </div>
        <div>
            <h3 className="font-semibold text-[20px]">Lalarukh Wasif</h3>

            <span className="text-slate-700">{format(review.createdAt)}</span>
            <div className="mt-4 text-slate-800">{review.text}</div>
        </div>

        <span className="ml-auto flex items-center gap-2">{review.stars}
            <AiFillStar size={22} color="rgb(59, 130, 246)"/>
        </span>
    </div>

</div>
  )
}

export default Review
