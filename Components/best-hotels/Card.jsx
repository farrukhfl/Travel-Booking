import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { format } from "currency-formatter";

const Card = ({ place }) => {
  return (
    <Link
      href={"/details/1"}
      className="h-[500px] w-[350px] flex flex-wrap rounded-xl cursor-pointer transition-all shadow-md hover:shadow-lg"
    >
      <div className="relative h-2/3 w-full">
        <Image
          src={place.image}
          alt="Location image"
          className="w-full h-full overflow-hidden rounded-tl-xl rounded-tr-xl object-cover"
        />

        <div className="absolute right-0 bottom-0 p-4 bg-blue-700 text-white rounded-tl-xl font-semibold">
          {place.location}
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 p-4">
        <div className="mt-2 flex justify-between items-center">
          <h2 className="text-left text-2xl text-slate-800 font-semibold">
            {place.name}
          </h2>

          <span className="p-2 rounded-full bg-blue-600 text-white flex items-center gap-2">
            <AiFillStar color="white" />

            <span className="text-white">{place.reviews}</span>
          </span>
        </div>

        <div className="mt-6 flex justify-between items-center">
            <span className="text-slate-600">
                {format(place.price, {locale: "en-US"})}
                <span className="ml-2">
                    per night
                </span>
            </span>
            <button className="py-2 px-6 cursor-pointer bg-blue-500 text-white">
                Book
            </button>
        </div>


      </div>
    </Link>
  );
};

export default Card;
