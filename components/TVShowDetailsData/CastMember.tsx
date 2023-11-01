import { FC } from "react";
import { ICastMember } from "../../types";
import ActorImage from "./ActorImage";

interface ShowDetailProps {
  actor: ICastMember;
}
const CastMember: FC<ShowDetailProps> = ({ actor }) => (
  <div
    data-testId={"actor"}
    className="grid-cols-3 items-end inline-flex md:border-b-2"
  >
    <ActorImage
      src={actor.person?.image?.medium}
      alt={`Image of ${actor.person?.name}`}
    />
    <div className="grid grid-rows-2 md:grid-rows-2 md:grid-cols-2 col-start-2 col-end-4">
      <div className="text-black text-xl font-light font-['Arial MT'] leading-tight w-[30px]">
        Actor
      </div>
      <div className="text-neutral-400 text-xl font-light font-['Arial MT'] leading-tight w-[200px]">
        {actor?.person?.name}
      </div>
    </div>
  </div>
);

export default CastMember;
