import axios from "axios";
import { useState, useEffect } from "react";
import { ICastMember } from "../../types";

// Custom hook for fetching cast data
const useCastData = (showId: number) => {
  const [cast, setCast] = useState<ICastMember[]>([]);

  useEffect(() => {
    if (!showId) return;

    const getCast = async () => {
      try {
        const response = await axios.get(`/api/getCast?query=${showId}`);
        setCast(response.data);
      } catch (error) {
        console.error(error);
        setCast([]);
      }
    };

    getCast();
  }, [showId]);

  return cast;
};

export default useCastData;
