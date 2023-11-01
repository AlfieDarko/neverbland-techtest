import { FC } from "react";
import { ICastMember } from "../../types";
import CastMember from "./CastMember";

const CastList: FC<{ cast: ICastMember[] }> = ({ cast }) => (
  <div className="flex flex-col">
    <p className="text-black text-3xl not-italic font-light leading-[35px] tracking-[0.5px] mb-[68px]">
      Starring
    </p>
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 ">
      {cast.length > 0 ? (
        cast.map((actor) => <CastMember key={actor.person?.id} actor={actor} />)
      ) : (
        <div className="grid grid-cols-2 h-20 relative items-end md:border-b-2">
          <div className="w-[100px]"></div>
          <div className="grid grid-rows-1 md:grid-rows-2 md:grid-cols-2">
            <div className="text-neutral-400 text-xl font-light font-['Arial MT'] leading-tight">
              No cast data available
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default CastList;
