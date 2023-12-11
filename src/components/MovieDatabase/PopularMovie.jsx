import { useState, useEffect } from "react";

export default function PopularMovie() {
  const [data, setData] = useState([]);
  const apiKey = "62c0121e68188863d4bc023757512a1c";
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data.results))
      .catch((err) => console.error("err " + err));
  }, []);

  return (
    <div className="mt-[60px] mx-[20px]">
      {data.map((res, id) => (
        <div key={id}>
          <h1>{res.original_title}</h1>
        </div>
      ))}
    </div>
  );
}
