"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function StarRatings({
  userId,
  storeId,
  token
}: {
  userId: string;
  storeId: string;
  token:string
}) {
  const [starValue, setStarValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const starCount = 5;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!starValue) {
      toast.error("Please select a rating before submitting");
      return;
    }
    const loadingId = toast.loading("Submitting rating...");
    try {
      await axios.post(
        "https://fsi-coding-challenge-api.vercel.app/api/v1/rating/create",
        {
          rating: starValue,
          storeId,
          userId,
        },
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
      );
      toast.dismiss(loadingId);
      toast.success("Rating submitted");
    } catch (error) {
      toast.dismiss(loadingId);
      const err = error as Error;
      toast.error("Failed to submit rating: " + err.message);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 text-2xl cursor-pointer">
        {new Array(starCount).fill(0).map((_, index) => (
          <span
            key={index}
            className={
              index < (hoverValue || starValue)
                ? "text-yellow-500"
                : "text-gray-400"
            }
            onMouseEnter={() => setHoverValue(index + 1)}
            onMouseLeave={() => setHoverValue(0)}
            onClick={() => setStarValue(index + 1)}
          >
            &#9733;
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </form>
      <Toaster/>
    </div>
  );
}
