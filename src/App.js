import { useContext, useState } from "react";
import Slider from "./components/Slider";
import { MoviesContext } from "./context/MoviesContext";
import Loading from "./components/Loading";
import Search from "./components/Search";
import "./index.css";
import GridIcon from "./components/GridIcon";
import SliderIcon from "./components/SliderIcon";

function App() {
  const [displayMode, setDisplayMode] = useState("slider");
  const { movies, loading, errorMessage } = useContext(MoviesContext);
  return (
    <div className="App">
      <div className={`spacer spacer--grid`}>
        <div className="navbar">
          <Search />
          {!loading && !errorMessage && (
            <div className="navbar__icons">
              <div
                onClick={() => setDisplayMode("grid")}
                className={`navbar__icons__icon-wrapper ${
                  displayMode === "grid"
                    ? "navbar__icons__icon-wrapper--active"
                    : ""
                }`}
              >
                <GridIcon />
              </div>
              <div
                onClick={() => setDisplayMode("slider")}
                className={`navbar__icons__icon-wrapper ${
                  displayMode === "slider"
                    ? "navbar__icons__icon-wrapper--active"
                    : ""
                }`}
              >
                <SliderIcon />
              </div>
            </div>
          )}
        </div>
      </div>
      <main>
        {loading && !errorMessage ? (
          <Loading />
        ) : (
          <>
            {!errorMessage && displayMode === "grid" && (
              <div className="spacer spacer--grid">
                <h2>Results</h2>
                <div className="movies-grid">
                  {movies.map((movie) => {
                    console.log(movie);
                    return (
                      <div
                        // className={`slideWrapper`}
                        style={{
                          backgroundImage: `url(${movie.Poster})`,
                          position: "relative",
                        }}
                      >
                        <div className="card-overlay">
                            <h5>{movie.Title}</h5>
                            <h6>{movie.Year}</h6>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {!errorMessage && displayMode === "slider" && (
              <div className="spacer">
                <h2>Results</h2>
                <Slider slides={movies} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
