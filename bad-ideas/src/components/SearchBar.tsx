import SearchIcon from "../icons/search";

type SearchBarProps = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string | null>>;
};

function SearchBar({setSearchTerm}: SearchBarProps) {
  return (
    <div className="w-[95%] md:w-[60%] mx-auto mt-10 mb-4 relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <SearchIcon width="w-7" color="text-light-blue" />
      </div >
      <input
        type="text"
        placeholder="Search ideas..."
        className="w-full pl-12 pr-4 py-3 bg-slate-950/80 border-3 border-light-blue
          rounded-lg text-3xl text-light-blue placeholder:text-neon-blue focus:outline-none focus:border-light-blue
          focus:shadow-[0_0_20px_#06ccee]"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;