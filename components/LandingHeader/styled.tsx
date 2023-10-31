import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledBG = styled(motion.div)`
  background: linear-gradient(-45deg, #221025, #0f002c, #000, #000);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media (min-width: 1024px) {
    height: 580px;
  }
`;
