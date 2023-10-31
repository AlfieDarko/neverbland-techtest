import React, { useEffect } from "react";
import ReactModal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import TVShowDetailsHeader from "../TVShowDetailsHeader";
import TVShowDetailsData from "../TVShowDetailsData";
import { IShowInfo } from "../../types";

interface ModalProps {
  isOpen: boolean;
  show: IShowInfo | null;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, show, closeModal }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <ReactModal
          ariaHideApp={false}
          id="modal"
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(10px)",
            },
            content: {
              maxHeight: "90vh",
              position: "relative",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              transform: "translate(-50%, -50%)",
              width: "90%",
              borderRadius: "4px",
              padding: "20px",
              overflow: "hidden", // To ensure that the motion.div doesn't exceed this container
              overflowY: "scroll",
            },
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TVShowDetailsHeader showData={show} />
            <TVShowDetailsData showData={show} />
            {/* {children} */}
          </motion.div>
        </ReactModal>
      )}
    </AnimatePresence>
  );
};

export default Modal;
