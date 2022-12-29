import React, { Component, createContext } from 'react';

export const MoviesContext = createContext();

class MoviesProvider extends Component {
    state = {
        movies: [],
        loading: true,
        errorMessage: '',
    };

    searchMoviesRequest = (searchResults) => {
        this.setState({
            ...this.state,
            loading: true,
            errorMessage: null,
        });
    }

    searchMoviesSuccess = (searchResults) => {
        this.setState({
            ...this.state,
            loading: false,
            movies: searchResults,
        });
    }

    searchMoviesError = (errorMessage) => {
        this.setState({
            ...this.state,
            loading: false,
            errorMessage,
        });
    }

    render() {
        return (
            <MoviesContext.Provider
                value={{
                    ...this.state,
                    searchMoviesSuccess: this.searchMoviesSuccess,
                    searchMoviesError: this.searchMoviesError,
                    searchMoviesRequest: this.searchMoviesRequest,
                }}
            >
                {this.props.children}
            </MoviesContext.Provider>
        )
    }
}

export default MoviesProvider;