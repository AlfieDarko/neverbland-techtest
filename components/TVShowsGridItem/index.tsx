import React, { FC } from "react";
import { motion } from "framer-motion";
import StarRatings from "../Ratings/StarRatings";

interface TVShowsGridItemProps {
  title: string;
  image?: string;
  score: number;
  id: number;
}

const TVShowsGridItem: FC<TVShowsGridItemProps> = ({
  title,
  image,
  score,
  id,
}) => {
  return (
    <motion.div
      className="cursor-pointer"
      aria-label={`Show details for ${title}`}
    >
      <div className="mb-[10px]">
        <motion.img
          src={image || "/images/no_movie_cover.png"} // Fallback to default image if none provided
          className="w-full lg:w-[165px] lg:h-[240px]"
          alt={title}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
        />
      </div>
      <div className="mb-[10px] hidden md:block">
        <StarRatings score={score} />
      </div>
      <p className="text-gray-200 text-xl not-italic font-light leading-5">
        {title}
      </p>
    </motion.div>
  );
};

export default TVShowsGridItem;
