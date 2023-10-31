import React, { FC } from "react";
import HalfStar from "./HalfStar";
import Star from "./Star";

interface StarRatingsProps {
  score: number | null;
  isBgDark?: boolean;
}

const roundToNearestHalf = (num: number): number => Math.round(num * 2) / 2;

const scoreToStar = (score: number): number => roundToNearestHalf(score * 0.5);

const StarRatings: FC<StarRatingsProps> = ({ score, isBgDark }) => {
  if (score === null) return <div>❓</div>;

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
