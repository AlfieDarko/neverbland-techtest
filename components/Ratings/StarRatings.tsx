import React, { FC } from "react";
import HalfStar from "./HalfStar";
import Star from "./Star";

// Define prop types for strong typing
interface StarRatingsProps {
  score: number | null;
  isBgDark?: boolean;
}

// Helper function to round to the nearest half
const roundToNearestHalf = (num: number): number => Math.round(num * 2) / 2;

// Helper function to scale and round the score
const scoreToStar = (score: number): number => roundToNearestHalf(score * 0.5);

// Define the StarRatings component
const StarRatings: FC<StarRatingsProps> = ({ score, isBgDark }) => {
  // Handle edge cases for null or undefined scores
  if (score === null) return <div>❓</div>;

  // Handle edge case for low scores
  if (score < 0.5) return <div>🤮</div>;

  const scoreToStarValue = scoreToStar(score);
  const fullStars = Math.floor(scoreToStarValue);
  const halfStar = scoreToStarValue % 1 !== 0;

  return (
    <div className="flex" role="img" aria-label={`Rating: ${score} out of 10`}>
      {Array.from({ length: fullStars }, (_, i) => (
        <Star key={i} />
      ))}
      {halfStar && <HalfStar isBgDark={isBgDark} />}
    </div>
  );
};

export default StarRatings;
