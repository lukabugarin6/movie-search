import React, { useEffect, useState, useContext, useRef } from "react";
import { useSearch } from "../../hooks/useSearch";
import { MoviesContext } from "../../context/MoviesContext";

import "./index.css";

const Search = ({}) => {
  const { searchMoviesError, searchMoviesRequest, errorMessage } =
    useContext(MoviesContext);
  const [ searchTerm, setSearchTerm ] = useState(null);
  const { searchRequest } = useSearch();

  useEffect(() => {
      searchMoviesRequest();
      const delayDebounceFn = setTimeout(() => {
          searchRequest(searchTerm)
      }, 500)
  
      return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  return (
    <div className="input-component-wrapper">
      <div className="input-wrapper">
        <svg
          width="30"
          height="30"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="input-wrapper__icon"
        >
          <path
            d="M17.5 2.5C9.225 2.5 2.5 9.225 2.5 17.5C2.5 25.775 9.225 32.5 17.5 32.5C20.8232 32.4925 24.0481 31.3721 26.66 29.3175L33.8175 36.475L36.475 33.8175L29.3175 26.66C31.3719 24.048 32.4923 20.8231 32.5 17.5C32.5 9.225 25.775 2.5 17.5 2.5ZM17.5 5C19.1415 5 20.767 5.32332 22.2835 5.95151C23.8001 6.57969 25.1781 7.50043 26.3388 8.66116C27.4996 9.8219 28.4203 11.1999 29.0485 12.7165C29.6767 14.233 30 15.8585 30 17.5C30 19.1415 29.6767 20.767 29.0485 22.2835C28.4203 23.8001 27.4996 25.1781 26.3388 26.3388C25.1781 27.4996 23.8001 28.4203 22.2835 29.0485C20.767 29.6767 19.1415 30 17.5 30C14.1848 30 11.0054 28.683 8.66116 26.3388C6.31696 23.9946 5 20.8152 5 17.5C5 14.1848 6.31696 11.0054 8.66116 8.66116C11.0054 6.31696 14.1848 5 17.5 5V5Z"
            fill="#808080"
          />
        </svg>

        <input
          value={searchTerm || ''}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search movies"
        />
      </div>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </div>
  );
};

export default Search;
