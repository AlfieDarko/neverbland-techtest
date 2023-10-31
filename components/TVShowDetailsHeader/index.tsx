/* eslint-disable @next/next/no-img-element */
import React from "react";
import StarRatings from "../Ratings/StarRatings";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import { IShowInfo } from "../../types";

interface TVShowDetailsHeaderProps {
  showData: IShowInfo;
}

const TVShowDetailsHeader: React.FC<TVShowDetailsHeaderProps> = ({
  showData,
}) => {
  // descructure showData to get show if showdata exists

  const { show } = showData || {};
  const sanitizedShowSummary = show?.summary
    ? DOMPurify.sanitize(show.summary)
    : "";

  return (
    <div className="mx-auto px-[15px] py-[50px] md:pb-[90px] md:pt-[0px] md:px-[100px] bg-[#171b22]">
      <h1 className="text-[#181A1F] text-3xl not-italic font-normal leading-[30px] tracking-[0.5px] mb-[60px]">
        Techflix Originals
      </h1>
      <div className="flex flex-col md:flex-row ">
        <div className="mr-0 md:mr-[50px] mb-5 md:mb-0 ">
          <img
            className="w-full md:w-[272px] md:min-w-[272px] md:h-[400px] relative md:top-[30px]"
            src={show?.image?.medium}
            alt=""
          />
        </div>

        <div className="md:mt-[64px] flex-col ">
          <div className="mb-5">
            <StarRatings isBgDark score={show?.rating?.average} />
          </div>
          <p className="text-white md:text-[50px] md:not-italic font-light md:leading-[50px] md:tracking-[0.5px] mb-5 not-italic leading-[25px] tracking-[0.333px] text-xl">
            {show?.name}
          </p>
          <p className="text-white md:text-xl md:not-italic md:font-light md:leading-[30px] md:tracking-[0.2px] text-[15px] not-italic font-light leading-5 tracking-[0.15px] max-w-[700px]">
            {parse(sanitizedShowSummary)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetailsHeader;
