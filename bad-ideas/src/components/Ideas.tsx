import { useState, useEffect } from "react";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import categories from "../data/categories.json";
import ideas from "../data/ideas.json";

import SearchBar from "./SearchBar";
import IdeaCard from "./IdeaCard";

import BeakerIcon from "../icons/beaker";
import ControllerIcon from "../icons/controller";
import GlobeIcon from "../icons/globe";
import PaletteIcon from "../icons/palette";
import PlanetIcon from "../icons/planet";
import WrenchIcon from "../icons/wrench";

function Ideas() {
  const catList = categories.categories;
  const ideaList = ideas.ideas;

  const colorMap: { [key: string]: string } = {
    rose: "text-rose-100 border-rose-400 bg-rose-950/5 hover:bg-rose-700/15 hover:text-rose-50 hover:border-rose-50 hover:shadow-[0_0_20px_#ff7abd]",
    pink: "text-pink-100 border-pink-400 bg-pink-950/5 hover:bg-pink-700/15 hover:text-pink-50 hover:border-pink-50 hover:shadow-[0_0_20px_#ff33ee]",
    fuchsia:
      "text-fuchsia-50 border-fuchsia-300 bg-fuchsia-950/5 hover:bg-fuchsia-700/15 hover:text-fuchsia-50 hover:border-fuchsia-50 hover:shadow-[0_0_20px_#c533ff]",
    indigo:
      "text-indigo-100 border-indigo-400 bg-indigo-950/5 hover:bg-indigo-700/15 hover:text-indigo-50 hover:border-indigo-50 hover:shadow-[0_0_20px_#775cff]",
    blue: "text-blue-100 border-blue-400 bg-blue-950/5 hover:bg-blue-700/15 hover:text-blue-50 hover:border-blue-50 hover:shadow-[0_0_20px_#06b0ee]",
    cyan: "text-cyan-100 border-cyan-400 bg-cyan-950/5 hover:bg-cyan-700/15 hover:text-cyan-50 hover:border-cyan-50 hover:shadow-[0_0_20px_#06d3ee]",
  };

  const colorMapActive: { [key: string]: string } = {
    rose: "text-rose-50 border-rose-50 bg-rose-700/15 shadow-[0_0_20px_#ff7abd]",
    pink: "text-pink-50 border-pink-50 bg-pink-700/15 shadow-[0_0_20px_#ff33ee]",
    fuchsia:
      "text-fuchsia-50 border-fuchsia-50 bg-fuchsia-700/15 shadow-[0_0_20px_#c533ff]",
    indigo:
      "text-indigo-50 border-indigo-50 bg-indigo-700/15 shadow-[0_0_20px_#775cff]",
    blue: "text-blue-50 border-blue-50 bg-blue-700/15 shadow-[0_0_20px_#06b0ee]",
    cyan: "text-cyan-50 border-cyan-50 bg-cyan-700/15 shadow-[0_0_20px_#06d3ee]",
  };

  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [numActive, setNumActive] = useState<number>(ideaList.length);

  useEffect(() => {
    updateCount();
  }, [activeCategory, ideaList]);

  useEffect(() => {
    updateCount();
  }, [searchTerm, ideaList]);

  const updateCount = () => {
    if (activeCategory !== null || searchTerm !== null) {
      let count = 0;
      for (const idea of ideaList) {
        if (
          (activeCategory === null || idea.category === activeCategory) &&
          (searchTerm === null ||
            idea.name.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          count = count + 1;
        }
      }
      setNumActive(count);
    } else {
      setNumActive(ideaList.length);
    }
  };

  return (
    <div className="text-neutral-50">
      {/*********************** FILTER BUTTONS ***********************/}
      <div className="mb-4 w-full flex place-content-center gap-x-4">
        {/* All Button */}
        <button
          className={`flex items-center gap-2 px-3 py-2 bg-neutral-900/10 border-2 rounded-lg hover:cursor-pointer
            hover:text-neutral-50 hover:outline-none hover:border-neutral-50 hover:shadow-[0_0_20px_#ffffff]
            ${
              activeCategory === null
                ? "text-neutral-50 outline-none border-neutral-50 shadow-[0_0_20px_#ffffff]"
                : "text-neutral-100 border-neutral-300"
            }
          `}
          onClick={() => {
            setActiveCategory(null);
          }}
        >
          All
        </button>

        {/* Other Category Buttons */}
        {Object.values(catList).map((cat) => {
          return (
            <button
              key={cat.id}
              className={`flex items-center gap-2 px-3 py-2 border-2 rounded-lg hover:cursor-pointer
              ${
                activeCategory === cat.id
                  ? colorMapActive[cat.color]
                  : colorMap[cat.color]
              }`}
              onClick={() => {
                setActiveCategory(cat.id);
              }}
            >
              {cat.id === "0" && <ControllerIcon width="w-6" />}
              {cat.id === "1" && <WrenchIcon width="w-6" />}
              {cat.id === "2" && <PaletteIcon width="w-6" />}
              {cat.id === "3" && <GlobeIcon width="w-6" />}
              {cat.id === "4" && <BeakerIcon width="w-6" />}
              {cat.id === "5" && <PlanetIcon width="w-6" />}
              {cat.name}
            </button>
          );
        })}
      </div>

      {/*********************** SEARCH BAR ***********************/}
      <SearchBar setSearchTerm={setSearchTerm} />

      {/*********************** FILTER RESULT COUNTER ***********************/}
      <div className="w-full mx-auto text-center text-3xl text-sky-50 mb-16">
        Showing {numActive}/{ideaList.length} ideas
      </div>

      {/*********************** IDEA CARDS ***********************/}
      <div className="max-w-7xl mx-auto pb-20">
        <ResponsiveMasonry>
          <Masonry sequential="true">
            {ideaList.map((idea) => {
              const shouldRender =
                (activeCategory === null || idea.category === activeCategory) &&
                (searchTerm === null ||
                  idea.name.toLowerCase().includes(searchTerm.toLowerCase()));

              if (shouldRender) {
                // TODO: Fix typescript issue here, i.e. remove "as keyof typeof catList"
                const category = catList[idea.category as keyof typeof catList];
                const categoryColor = category.color;
                const categoryName = category.name;
                const colorCSS = colorMap[categoryColor];

                return (
                  <IdeaCard
                    idea={idea}
                    categoryName={categoryName}
                    colorCSS={colorCSS}
                  />
                );
              } else {
                return null;
              }
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
}

export default Ideas;
