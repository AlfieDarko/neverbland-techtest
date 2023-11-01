import { FC } from "react";
import { IShowInfo } from "../../types";
import ShowDetail from "./ShowDetail";

const ShowInfo: FC<{ show: IShowInfo }> = ({ show }) => {
  return (
    <div className="flex flex-col md:mb-0 mb-10">
      <p className="text-black text-3xl not-italic font-light leading-[35px] tracking-[0.5px] mb-[68px]">
        Show Info
      </p>
      <ShowDetail
        label="Streamed on"
        content={show.show.network?.name || "Unknown"}
      />
      <ShowDetail
        label="Scheduled"
        content={show.show.schedule?.days || "Unknown"}
      />
      <ShowDetail label="Status" content={show.show.status || "Unknown"} />
      <ShowDetail label="Genres" content={show.show.genres || "Unknown"} />
    </div>
  );
};

export default ShowInfo;
