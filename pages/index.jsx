import { NextSeo } from "next-seo";
import React from "react";
import MovieGrid from "../components/TVShowsGrid";
import Modal from "../components/Modal";
import LandingHeader from "../components/LandingHeader";
import TVShowDetailsHeader from "../components/TVShowDetailsHeader";
import TVShowDetailsData from "../components/TVShowDetailsData";
import SearchBar from "../components/SearchBar";
import { useShowContext } from "../contexts";

export default function Home() {
  const SEO = {
    title: "TechFlix",
    description: "Techflix: The #1 source for dope TV shows and movies",

    openGraph: {
      title: "Techflix",
      description: "The #1 source for dope TV shows and movies",
      type: "website",
      locale: "en_GB",
      url: "waterwhip.co",
      site_name: "Techflix",
    },
  };

  const [
    showData,
    setShowData,
    isShowDataLoading,
    setIsShowDataLoading,
    showBackgrounds,
  ] = useShowContext();

  return (
    <div className="bg-[#171b22]">
      <NextSeo {...SEO} />
      <header className="bg-[#171b22] flex  pt-4">
        <SearchBar
          setShowData={setShowData}
          isShowDataLoading={isShowDataLoading}
          setIsShowDataLoading={setIsShowDataLoading}
        />
      </header>

      <main>
        <div className="bg-[#171b22] md:h-[580px] ">
          <LandingHeader backgrounds={showBackgrounds} />
        </div>

        <div className="px-[15px] bg-[#171b22] mx-auto">
          <MovieGrid />
        </div>
      </main>
    </div>
  );
}
