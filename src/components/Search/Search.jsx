import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Search({ onSearch }) {
  const [query, setQuery] = useState("");
  const apiKey = "62c0121e68188863d4bc023757512a1c";

  const searchMovie = () => {
    if (query.trim() !== "") {
      onSearch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-white mx-10" onClick={searchMovie}>
        Search
      </button>
    </div>
  );
}
