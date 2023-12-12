import { useState, useEffect } from "react";
import rating from "../../../images/216411_star_icon (2).png";

export default function TopRatedMovies() {
  const [data, setData] = useState([]);
  const apiKey = "62c0121e68188863d4bc023757512a1c";
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data.results))
      .catch((err) => console.error("err " + err));
  }, []);

  return (
    <div className="mt-[60px] mx-[20px]">
      <div className="flex flex-wrap flex-row justify-between gap-4">
        {data.map((res, id) => (
          <div key={id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${res.poster_path}`}
              alt="poster"
              className="w-[150px] h-[255px] rounded-lg"
            />
            <h3 className="text-center w-[150px]">{res.title}</h3>
            <div className="flex items-center justify-center">
              <img
                src={rating}
                alt="star rating"
                className="w-[30px] h-[30px]"
              />
              <h3>{res.vote_average}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
