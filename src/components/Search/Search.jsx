import { useState } from "react";
import SearchIcon from "../../../images/2024633_find_magnifier_research_search_icon.png";

// eslint-disable-next-line react/prop-types
export default function Search({ onSearch }) {
  const [query, setQuery] = useState("");
  const apiKey = "62c0121e68188863d4bc023757512a1c";

  const searchMovie = () => {
    if (query.trim() !== "") {
      onSearch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );
      setQuery("");
    }
  };

  return (
    <div className="flex items-center justify-start gap-5">
      <input
        type="text"
        placeholder="search movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-black text-white placeholder:text-white h-[30px] rounded-lg px-2"
      />
      <button onClick={searchMovie}>
        <img src={SearchIcon} className="w-[40px] h-[40px]" />
      </button>
    </div>
  );
}
