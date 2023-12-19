//import React from "react";
import Logo from "../../../images/7511679_ball_dragon_game_movie_icon.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="mt-[20px] mx-[30px]">
      <div className="flex justify-between items-center font-Inria-Serif">
        <div className="flex items-end">
          <img
            src={Logo}
            className="w-[70px] h-[70px] md:w-[100px] md:h-[100px]"
          />
          <h1 className="hidden lg:block text-3xl font-bold">Cineplex</h1>
        </div>
        <div className="flex justify-between items-center text-xl gap-10 md:text-3xl">
          <Link to="/Movie-App/">Home</Link>
          <Link to="/Movie-App/TopRatedMovies">Top-Rated</Link>
          <Link to="/Movie-App/UpComingMovies">Up-Coming</Link>
        </div>
      </div>
    </div>
  );
}
