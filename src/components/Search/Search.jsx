import { useState, useEffect } from "react";

export default function Search() {
  const apiKey = "62c0121e68188863d4bc023757512a1c";
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  function searchMovies() {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => console.log(data.results))
      .catch((err) => console.error("err" + err));
  }

  useEffect(() => {
    if (query.trim() !== "") {
      searchMovies();
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>
        {data.map((data) => {
          <div key={data}>
            <div>{data.original_title}</div>
          </div>;
        })}
      </div>
    </div>
  );
}
