import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import rating from "../../images/216411_star_icon (2).png";
import noMoviePoster from "../../images/no-poster-available.jpg";
import Back from "../../images/2203523_arrow_back_botton_left_icon (1).png";
import NoImg from "../../images/no img .jpeg";

export default function ActorMovies() {
  const [actor, setActor] = useState(null);
  const [movie, setMovie] = useState(null);
  const { actorId } = useParams();
  const navigate = useNavigate();
  const apiKey = "62c0121e68188863d4bc023757512a1c";
  const actorUrl = `https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}`;
  const actorMovieUrl = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${apiKey}`;

  useEffect(() => {
    fetch(actorUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setActor(data);
      })
      .catch((err) => console.error("error " + err));
  }, [actorUrl]);

  useEffect(() => {
    fetch(actorMovieUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      })
      .catch((err) => console.error("error " + err));
  }, [actorMovieUrl]);

  return (
    <div className="mt-5">
      {actor ? (
        <>
          <div className="flex flex-col justify-center items-center font-Inria-Serif lg:items-start">
            <div className="flex flex-col justify-center items-center lg:flex-row lg:items-start gap-3 lg:mx-[20px]">
              <img
                src={
                  actor.profile_path == null
                    ? NoImg
                    : `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                }
                alt="movie poster"
                className="w-[300px] h-[500px] rounded-lg"
              />
              <div className="flex justify-center items-center flex-col lg:items-start">
                <p className="mt-5 font-bold text-2xl">{actor.name}</p>
                <p className="mt-2 italic">{actor.place_of_birth}</p>
                <div className="text-center px-2 mt-5 lg:text-start lg:px-0">
                  {actor.biography === "" ? (
                    <h3 className="italic">No Biography for {actor.name}</h3>
                  ) : (
                    <div>
                      <h3 className="font-bold text-xl">biography</h3>
                      <div className="mt-3">
                        {actor.biography.slice(
                          0,
                          actor.biography.indexOf(
                            ".",
                            actor.biography.indexOf(".") + 1
                          )
                        )}
                        .
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-8 w-full flex justify-center items-center lg:justify-normal">
                  <img
                    src={Back}
                    className="w-[50px] h-[51px] cursor-pointer"
                    onClick={() => navigate(-1)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            {movie ? (
              <div className="flex justify-center items-center flex-col flex-wrap font-Inria-Serif">
                <h3 className="font-bold text-center">
                  Movies {actor.name} has featured in:
                </h3>
                <div className="flex justify-center items-center flex-col flex-wrap">
                  <div className="flex flex-wrap flex-row justify-between gap-4 mx-[20px] mt-10 md:justify-normal md:gap-[60px] lg:justify-evenly">
                    {movie.cast.slice(0, 10).map((movies) => (
                      <div key={movies.id}>
                        <Link to={`/Movie-App/movie/${movies.id}`}>
                          <img
                            src={
                              movies.poster_path == null
                                ? noMoviePoster
                                : `https://image.tmdb.org/t/p/w500${movies.poster_path}`
                            }
                            alt="poster"
                            className="w-[150px] h-[255px] rounded-lg md:w-[200px] md:h-[340px] lg:w-[270px] lg:h-[459px]"
                          />
                          <h3 className="text-center w-[150px] md:w-[200px] lg:w-[270px]">
                            {movies.title}
                          </h3>
                          <div className="flex items-center justify-center">
                            <img
                              src={rating}
                              alt="star rating"
                              className="w-[30px] h-[30px]"
                            />
                            <h3>{Math.floor(movies.vote_average)}</h3>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
