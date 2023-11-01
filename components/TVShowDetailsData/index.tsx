import React, { FC, useEffect, useState } from "react";
import { ICastMember, IShowInfo } from "../../types";
import axios from "axios";
import useCastData from "./useCastData";
import CastList from "./CastList";
import ShowInfo from "./ShowInfo";

interface TVShowDetailsDataProps {
  showData: IShowInfo;
}

const TVShowDetailsData: FC<TVShowDetailsDataProps> = ({ showData }) => {
  const { show } = showData || {};
  const showId = show?.id;
  const cast = useCastData(show.id);

  return (
    <div className="mt-[100px] mr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShowInfo show={showData} />
        <CastList cast={cast} />
      </div>
    </div>
  );
};

export default TVShowDetailsData;
