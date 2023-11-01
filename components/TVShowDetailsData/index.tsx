import React, { FC, useEffect, useState } from "react";
import { IShowInfo } from "../../types";
import axios from "axios";

interface TVShowDetailsDataProps {
  showData: IShowInfo;
}

const TVShowDetailsData: FC<TVShowDetailsDataProps> = ({ showData }) => {
  const [cast, setCast] = useState(null);

  const { show } = showData || {};
  const showId = show?.id;

  useEffect(() => {
    const getCast = async () => {
      const response = await axios.get(`/api/getCast?query=${showId}`);
      setCast(response.data);
    };
    getCast();

    return () => {
      setCast(null);
    };
  }, [showId]);

  return (
    <div className="mt-[100px] mr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col md:mb-0 mb-10">
          <p className="text-black text-3xl not-italic font-light leading-[35px] tracking-[0.5px] mb-[68px]">
            Show Info
          </p>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 ">
            <div
              data-testid="network-name"
              className="h-20 relative flex-col md:flex-row justify-start md:items-center inline-flex md:border-b-2"
            >
              <div className="w-40 text-black text-xl font-light font-['Arial MT'] leading-tight">
                {"Streamed on "}
              </div>
              <div className="text-neutral-400 text-xl font-light font-['Arial MT'] leading-tight ">
                {show?.network?.name || "Unknown"}
              </div>
            </div>
            <div
              data-testid="scheduled-on"
              className="h-20 relative flex-col md:flex-row justify-start md:items-center inline-flex md:border-b-2"
            >
              <div className="w-40 text-black text-xl font-light font-['Arial MT'] leading-tight">
                {"Scheduled "}
              </div>
              <div className="text-neutral-400 text-xl font-light font-['Arial MT'] leading-tight">
                {show?.schedule?.days?.join(", ") || "Unknown"}
              </div>
            </div>
            <div
              data-testid="status"
              className="h-20 relative flex-col md:flex-row justify-start md:items-center inline-flex md:border-b-2"
            >
              <div className="w-40 text-black text-xl font-light font-['Arial MT'] leading-tight">
                {"Status "}
              </div>
              <div className="text-neutral-400 text-xl font-light font-['Arial MT'] leading-tight">
                {show?.status}
              </div>
            </div>
            <div
              data-testid="genres"
              className="h-20 relative flex-col md:flex-row justify-start md:items-center inline-flex md:border-b-2"
            >
              <div className="w-40 text-black text-xl font-light font-['Arial MT'] leading-tight">
                {"Genres "}
              </div>
              <div className="text-neutral-400 text-xl font-light font-['Arial MT'] leading-tight">
                {show?.genres?.join(", ")}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-black text-3xl not-italic font-light leading-[35px] tracking-[0.5px] mb-[68px]">
            Starring
          </p>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 ">
            {cast && cast.length > 0 ? (
              cast.map((actor) => {
                return (
                  <div
                    data-testid="actor"
                    key={actor?.person?.id}
                    className="grid grid-cols-3 h-20 relative items-end inline-flex md:border-b-2"
                  >
                    <div className="w-[100px] ">
                      <img
                        src={
                          actor?.person?.image?.medium ||
                          "images/unknown_actor.png"
                        }
                        alt={`Image of ${actor?.person?.name}`}
                        className="w-14 h-14 rounded-full mb-2"
                      />
                    </div>
                    <div className="grid grid-rows-2 md:grid-rows-2 md:grid-cols-2 col-start-2 col-end-4">
                      <div className="text-black text-xl font-light font-['Arial MT'] leading-tight">
                        Actor
                      </div>
                      <div className="text-neutral-400 text-xl font-light font-['Arial MT'] leading-tight">
                        {actor?.person?.name}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="grid grid-cols-2 h-20 relative items-end md:border-b-2">
                <div className="w-[100px]"></div>
                <div className="grid grid-rows-1 md:grid-rows-2 md:grid-cols-2">
                  <div className="text-neutral-400 text-xl font-light font-['Arial MT'] leading-tight">
                    No data available
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetailsData;
