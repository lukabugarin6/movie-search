import { useContext, useEffect } from "react";
import { MoviesContext } from "../context/MoviesContext";

export const useSearch = () => {
  const { searchMoviesSuccess, searchMoviesError, searchMoviesRequest } =
    useContext(MoviesContext);

  const searchRequest = (searchValue) => {
    if (searchValue === "") {
      searchMoviesError("Please enter something");
      return;
    }

    fetch(`https://www.omdbapi.com/?s=${searchValue ?? "man"}&apikey=eafa1b98`)
      .then((res) => res.json())
      .then((jsonRes) => {
        if (jsonRes.Response === "True") {
          if (jsonRes.Search.length > 0) {
            searchMoviesSuccess(jsonRes.Search);
          } else {
            searchMoviesError('No results.');
          }
        } else {
          searchMoviesError(jsonRes.Error);
        }
      });
  };

  return {
    searchRequest,
  };
};
