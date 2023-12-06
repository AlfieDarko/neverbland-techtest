import { FC } from "react";

interface ShowDetailProps {
  label: string;
  content: string | string[];
  dataTestId?: string;
}

const ShowDetail: FC<ShowDetailProps> = ({ label, content, dataTestId }) => (
  <div
    data-testid={dataTestId}
    className="h-20 relative flex-col md:flex-row justify-start md:items-center inline-flex md:border-b-2"
  >
    <div className="w-40 text-black text-xl font-light font-['Arial MT'] leading-tight">
      {label}
    </div>
    <div className="text-neutral-400 text-xl font-light font-['Arial MT'] leading-tight ">
      {Array.isArray(content) ? content.join(", ") : content}
    </div>
  </div>
);

export default ShowDetail;
