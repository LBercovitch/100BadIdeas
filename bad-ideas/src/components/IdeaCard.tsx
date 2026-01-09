import BeakerIcon from "../icons/beaker";
import ControllerIcon from "../icons/controller";
import GlobeIcon from "../icons/globe";
import PaletteIcon from "../icons/palette";
import PlanetIcon from "../icons/planet";
import WrenchIcon from "../icons/wrench";

type IdeaCardProps = {
  idea: {
    id: number;
    category: string;
    name: string;
    description: string;
    link: string;
    thumbnail: string;
  };
  categoryName: string;
  colorCSS: string;
};

function IdeaCard({ idea, categoryName, colorCSS }: IdeaCardProps) {
  return (
    <div
      key={idea.id}
      className={`group w-full pt-4 pb-14 px-5 m-2 border-6 rounded-lg hover:cursor-pointer ${colorCSS}`}
    >
      <p className="flex gap-2 mb-10">
        {idea.category === "0" && <ControllerIcon width="w-6" />}
        {idea.category === "1" && <WrenchIcon width="w-6" />}
        {idea.category === "2" && <PaletteIcon width="w-6" />}
        {idea.category === "3" && <GlobeIcon width="w-6" />}
        {idea.category === "4" && <BeakerIcon width="w-6" />}
        {idea.category === "5" && <PlanetIcon width="w-6" />}
        {categoryName}
      </p>
      <h2 className="text-2xl mb-2">{idea.name}</h2>
      {/* {idea.thumbnail} */}
      <p className="font-electrolize">{idea.description}</p>
      <p className="mt-10 hidden group-hover:block">
        {idea.link || "Coming soon..."}
      </p>
    </div>
  );
}

export default IdeaCard;
