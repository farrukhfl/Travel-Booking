"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import hotel_image_1 from "@/public/assets/hr_1.jpg";
import hotel_image_2 from "@/public/assets/hr_2.jpg";
import { register } from "swiper/element/bundle";
import { AiFillStar } from "react-icons/ai";
import { format } from "currency-formatter";
import { FaBed, FaWifi } from "react-icons/fa";
import { CiLocationOn } from 'react-icons/ci'
import Review from "./Review";
import BookModal from "@/Components/book-modal/BookModal";
import { useQuery } from "@tanstack/react-query";
import { getListingById } from "./service";
import { ClipLoader } from "react-spinners";
import Reviews from "./Reviews";


register();

const HotelDetails = (ctx) => {
  const id = ctx.params.id;
  
  const [showModal, setShowModal] = useState(false);
  const swiperElRef = useRef(null);

  const {data: listing, isPending} = useQuery({
    queryKey: ["listings", {id}],
    queryFn: () => getListingById(id)
  })

  const handleShowModal = () => setShowModal((prev) => true);
  const handleHideModal = () => setShowModal((prev) => false);

  if(isPending){
    const style = {
      marginTop: "5rem",
      position: "absolute",
      top:"50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      height: "100vh"
    }
    return (
      <div style={style}>
      <ClipLoader 
      color={"#123abc"} />

      </div>
    )
  }

  return (
    <div
      className={`min-h-screen w-full mt-24 ${showModal && "overflow-hidden"}`}
    >
      {
        showModal &&  <BookModal listing={listing} handleHideModal={handleHideModal} />
      } 
      <div className="h-full w-3/4 mx-auto">
        <div>
          <div className="w-full h-[750px] overflow-hidden mx-auto">
            <div className="w-full h-full">
              <swiper-container
                ref={swiperElRef}
                slides-per-view="1"
                navigation="true"
              >
               {listing?.imageUrls.map((imageUrl)=> (
                <swiper-slide>
                  <Image className="h-[750px] w-full object-cover rounded-lg" 
                  height="750" width="750"
                  src={imageUrl}
                  blurDataURL={listing.blurredImage}
                  placeholder="blur"
                  />
                </swiper-slide>
               ))}
              </swiper-container>
            </div>
          </div>

          <div className="mt-12 px-6 w-full flex items-center justify-between ">
            <h2 className="font-bold text-2xl">{listing?.name}</h2>

            <div>
              <span className="p-2 px-4 text-[22px] rounded-full bg-blue-600 text-white flex items-center gap-2">
                <AiFillStar color="white" />

                <span className="text-white">{listing?.avgRating}</span>
              </span>
            </div>
          </div>

          <div className="mt-16 px-6 flex items-center gap-8">
            <span className="flex items-center gap-2">
              <CiLocationOn />
              {listing?.location}
            </span>
            <span className="flex items-center gap-2">
              {format(listing?.pricePerNight, { locale: "en-US" })}/night
            </span>
            <span className="flex items-center gap-2">
              {listing?.beds} <FaBed />
            </span>
            {listing?.hasFreeWifi && 
            <span className="flex items-center gap-2">
            Free <FaWifi />
          </span>
            }
            
          </div>

          <div className="mt-16 px-6 w-full flex items-center justify-between">
            <p className="text-xl max-w-xl text-slate-700">
              {listing?.desc}
            </p>
            <button onClick={handleShowModal} className="cursor-pointer py-2 px-6 rounded-lg text-xl text-white bg-blue-500">
              Book
            </button>
          </div>
        </div>
        <div className="border-t-2 border-white-800 px-6 mt-16 mx-auto">
      <h1 className="mt-16 text-3xl font-bold">Reviews</h1>
        <Reviews id={id} />
      </div>
      </div>
    </div>
  );
};

export default HotelDetails;
