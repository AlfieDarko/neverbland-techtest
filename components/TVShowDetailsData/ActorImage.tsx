import { FC } from "react";

const ActorImage: FC<{ src?: string; alt: string }> = ({ src, alt }) => (
  <div className="w-[100px] ">
    <img
      src={src || "/images/unknown_actor.png"}
      alt={alt}
      className="w-14 h-14 rounded-full mb-2"
    />
  </div>
);

export default ActorImage;
