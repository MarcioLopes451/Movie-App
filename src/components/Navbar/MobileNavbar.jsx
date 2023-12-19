//import React from "react";
import Logo from "../../../images/7511679_ball_dragon_game_movie_icon.png";
import Menu from "../../../images/134216_menu_lines_hamburger_icon.png";
import Close from "../../../images/211651_close_round_icon (1).png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const closeNav = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", closeNav);
    return () => {
      document.body.removeEventListener("click", closeNav);
    };
  });

  const preventClose = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="mt-[20px] mx-[20px]" onClick={preventClose}>
      <div className="flex justify-between items-center">
        <img src={Logo} className="w-[70px] h-[70px]" />
        <img src={Menu} className="w-[70px] h-[70px]" onClick={handleOpen} />
        {open && (
          <div className="absolute bg-black top-0 left-[150px] z-50 w-[260px] h-full">
            <img
              src={Close}
              alt="close btn"
              className="w-[50px] h-[50px] mt-5 float-right mx-5"
              onClick={handleOpen}
            />
            <div className="mt-32 text-white">
              <div className="flex flex-col justify-start items-center gap-4">
                <h2>
                  <button onClick={handleOpen}>
                    <Link to="/Movie-App/">Home</Link>
                  </button>
                </h2>
                <h2>
                  <button onClick={handleOpen}>
                    <Link to="/Movie-App/TopRatedMovies">Top-Rated Movies</Link>
                  </button>
                </h2>
                <h2>
                  <button onClick={handleOpen}>
                    <Link to="/Movie-App/UpComingMovies">Up-Coming Movies</Link>
                  </button>
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
