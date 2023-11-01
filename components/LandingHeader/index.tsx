import React, { useEffect } from "react";
import { useShowContext } from "../../contexts";
import { motion, useAnimation } from "framer-motion";
import { StyledBG } from "./styled";
import { IShowBackgroundImage } from "../../types";
import styled from "styled-components";

interface LandingHeaderProps {
  backgrounds: IShowBackgroundImage[];
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ backgrounds }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.set({ filter: "blur(20px)", opacity: 0 });
  }, [controls]);

  useEffect(() => {
    controls
      .start({ opacity: 0 })
      .then(() => {
        controls.start({ opacity: 1, filter: "blur(0px)" });
      })
      .catch((error) => {
        console.error("An error occurred while animating:", error);
      });
  }, [controls, backgrounds]);

  const backgroundImage =
    backgrounds?.length &&
    backgrounds[backgrounds.length - 1].resolutions.original.url;

  return (
    <div className="bg-[#171b22] md:h-[580px] ">
      <StyledBG
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
        animate={controls}
        className="mx-auto  md:px-[0px] mb-[40px] md:mb-0 w-full max-h-[580px] md:h-[580px] aspect-w-16 aspect-h-9 relative overflow-hidden "
      >
        {backgroundImage && (
          <motion.img
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
            animate={controls}
            src={backgroundImage}
            alt="Background Image"
            className="object-contain w-full relative top-[0px] filter grayscale"
          />
        )}
      </StyledBG>
    </div>
  );
};

export default LandingHeader;
