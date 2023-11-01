import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import TVShowsGridItem from "../TVShowsGridItem";
import { useShowContext } from "../../contexts";
import Modal from "../Modal";
import { IShowInfo } from "../../types";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.3,
      staggerChildren: 0.5,
    },
  }),
};

const getShowDataFromId = (id: number, showData: IShowInfo[]) => {
  return showData ? showData.find((item) => item.show.id === id) : [];
};

const TVShowsGrid: React.FC = () => {
  const [showData, , , , , setShowBackground] = useShowContext();
  const [showModal, setShowModal] = React.useState(false);
  const [showId, setShowId] = React.useState<number>();

  const closeModal = () => {
    setShowModal(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setShowModal(true);
    }
  };

  const handleOnFocus = async (e: React.FocusEvent<HTMLDivElement>) => {
    const id = parseInt(e.currentTarget.getAttribute("data-id") || "", 10);
    if (id) {
      const response = await axios.get(`/api/findBackgroundImage?query=${id}`);
      const backgroundImages = response.data;
      setShowBackground(backgroundImages);
    }
  };

  const handleMouseOver = async (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const id = element.getAttribute("data-id");

    const timer = setTimeout(async () => {
      const response = await axios.get(`/api/findBackgroundImage?query=${id}`);
      const backgroundImages = response.data;
      setShowBackground(backgroundImages);
    }, 1000);

    element.addEventListener("mouseleave", () => {
      clearTimeout(timer);
    });
  };

  return (
    <div className="px-[15px] bg-[#171b22] mx-auto">
      <div className="md:relative md:top-[-170px] md:px-[100px] max-w-[1440px] mx-auto ">
        <Modal
          isOpen={showModal}
          closeModal={closeModal}
          show={getShowDataFromId(showId as number, showData as IShowInfo[])}
        />
        {showData && (
          <h2 className="text-white md:text-8xl text-6xl opacity-50 not-italic font-bold leading-[35px] tracking-[0.5px] mb-10">
            Your Shows:
          </h2>
        )}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 gap-y-10"
          role="grid"
        >
          {showData?.map((item: IShowInfo, index: number) => (
            <motion.div
              data-id={item.show.id}
              tabIndex={0}
              role="gridcell"
              variants={fadeInAnimationVariants}
              initial="initial"
              animate="animate"
              key={item.show.id}
              onFocus={(e) => handleOnFocus(e)}
              onKeyDown={handleKeyDown}
              onClick={() => {
                setShowModal(true);
                setShowId(item.show.id);
              }}
              onMouseOver={handleMouseOver}
            >
              <TVShowsGridItem
                title={item.show.name}
                image={item.show.image?.medium}
                score={item.show.rating.average as number}
                id={item.show.id}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVShowsGrid;
