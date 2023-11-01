import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import { useShowContext } from "../../contexts";
import Spinner from "./Spinner";
import { IShowInfo } from "../../types";

interface SearchBarProps {
  setShowData: React.Dispatch<React.SetStateAction<IShowInfo[] | null>>;
  isShowDataLoading: boolean;
  setIsShowDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: FC<SearchBarProps> = ({
  setShowData,
  isShowDataLoading,
  setIsShowDataLoading,
}) => {
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const findShows = async () => {
    setError(null);
    setIsShowDataLoading(true);
    try {
      const res = await axios(`/api/findShows?query=${query}`);
      if (res) {
        setShowData(res.data);
      }
    } catch (error) {
      setError("An error occurred while fetching shows.");
      console.error("An error occurred while fetching shows:", error);
    } finally {
      setIsShowDataLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      findShows();
    }
  };

  useEffect(() => {
    findShows();
  }, [query]);

  return (
    <div className="flex items-center flex-row bg-[#171b22] mb-2 mr-2">
      <div className="flex justify-center mx-[10px] md:mx-8 shrink max-w-1/4 ">
        <img
          src="images/TECHFLIX_LOGO.png"
          alt="techflix logo"
          className="w-1/2 md:w-full w-[100px]"
        />
      </div>
      <div className="relative w-full">
        <label htmlFor="showSearch" className="text-white sr-only">
          Search for shows
        </label>
        <input
          id="showSearch"
          type="text"
          value={query}
          onChange={(e) => {
            setError(null);
            setQuery(e.target.value);
          }}
          onKeyPress={handleKeyPress}
          placeholder="Search..."
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error ? "border-red-500" : "border-purple-500"
          }`}
        />
        {isShowDataLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
