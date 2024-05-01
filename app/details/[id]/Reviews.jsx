"use client";
import React, { useState } from "react";
import Review from "./Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { getReviewByListing, postReview } from "./service";
import { AiFillStar } from "react-icons/ai";
import Pagination from "@/Components/pagination/Pagination";

const Reviews = ({ id }) => {
  const [selectedStar, setSelectedStar] = useState(5);
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const { data: reviews, isPending: isPendingQuery } = useQuery({
    queryFn: () => getReviewByListing(id),
    queryKey: ["reviews"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ()=> handleSubmit(),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"])
      queryClient.invalidateQueries(["listings"]);
    }
  });
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffSet = itemOffset + itemsPerPage;
  const currentReviews = reviews?.slice(itemOffset, endOffSet)


  if (isPending) {
    const style = {
      marginTop: "5rem",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      height: "100vh",
    };
    return (
      <div style={style}>
        <ClipLoader color={"#123abc"} />
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (text === "") return toast.error("Review can't be empty");
      const body = {
        text,
        stars: selectedStar,
      };
      await postReview(id, body);
      toast.success("Successfully posted a review");
      setText("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
   <>
      <div className="mt-8 flex items-center gap-6">
        {Array.from(Array(5).keys()).map((number) => (
          <span
            onClick={() => setSelectedStar(number + 1)}
            className={`${
              selectedStar === number + 1 ? "scale-125" : ""
            } cursor-pointer flex items-center transition-all gap-2`}
          >
            {number + 1}
            <AiFillStar size={22} color="rgb(59, 130, 246)" />
          </span>
        ))}
      </div>
      <form
        onSubmit={mutate}
        className="mt-8 flex items-center gap-28 border rounded-lg py-4 px-6 w-max"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="outline-none"
          placeholder="Leave your Opinion"
        />

        <button disabled={isPending} className="text-white bg-blue-500 text-xl px-6 py-2 cursor-pointer rounded-lg hover:bg-blue-400 transition-all">
          Post
        </button>
      </form>

      <div className="mt-16 h-[900px] flex flex-col gap-24 w-1/3">
      {currentReviews?.map((review)=>(
         <Review id={review.id} review={review} />
      ))}
      <Pagination setItemOffset={setItemOffset} itemsPerPage={itemsPerPage} reviews={reviews} />
      </div>
     
      </>
  );
};

export default Reviews;
