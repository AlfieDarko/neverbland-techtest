import { NextSeo } from "next-seo";
import React from "react";
import MovieGrid from "../components/TVShowsGrid";
import LandingHeader from "../components/LandingHeader";
import SearchBar from "../components/Searchbar";
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
        <LandingHeader backgrounds={showBackgrounds} />
        <MovieGrid />
      </main>
    </div>
  );
}
