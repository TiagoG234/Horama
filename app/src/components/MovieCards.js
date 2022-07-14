import { React, useState, useRef, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import MoviePoster from "./MoviePoster";
import "./index.css";
import useDidMountEffect from "./useDidMountEffect";
import Home from "./Home";
import { Image, Container, Row, Alert } from "react-bootstrap";

const MovieCards = () => {
  const { q } = useParams();
  const hasFetched = useRef(false);
  const response = useRef(false);
  const count = useRef(0);
  const noMoreResults = useRef(true);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    count.current = 0;
    hasFetched.current = false;
    if (!hasFetched.current) {
      fetch(`http://omdbapi.com/?apikey=470179fa&s=${q}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Response === "True") {
            setMovies(data.Search);
            response.current = true;
            count.current = 2;
            setIsLoading(true);
            document.title = `Search results for ${q}`;
          } else {
            response.current = false;
            setIsLoading(true);
          }
        });
      hasFetched.current = true;
      setIsLoading(false);
    }
  }, [q, setMovies]);

  useDidMountEffect(() => {
    if (loadMore) {
      fetch(`http://omdbapi.com/?apikey=470179fa&s=${q}&page=${count.current}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.Response === "True") {
            setMovies([...movies, ...data.Search]);
            response.current = true;
            count.current++;
            setIsLoading(true);
            setLoadMore(false);
          } else {
            setIsLoading(true);
            setLoadMore(false);
            noMoreResults.current = false;
          }
        });
    }
  }, [loadMore]);
  return (
    <>
      <Home />
      <div className="mt-5 mb-2 px-3 py-3 justify-content-center d-flex text-center flex-wrap align-items-center">
        {isLoading ? (
          response.current ? (
            <div className="mt-2 mb-5 px-3 py-3 justify-content-center d-flex text-center flex-wrap align-items-center">
              {movies.map((movie) => {
                return (
                  <MoviePoster
                    name={movie.Title}
                    key={movie.imdbID}
                    year={movie.Year}
                    id={movie.imdbID}
                    poster={movie.Poster}
                  />
                );
              })}
              {noMoreResults.current ? (
                <div className="inline-flex container">
                  <button
                    className="btn btn-secondary"
                    onClick={(e) => {
                      setLoadMore(true);
                    }}
                  >
                    Load More
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <h2 className="justify-content-center">Movie Not Found!</h2>
          )
        ) : (
          <div className="spinner-grow" role="status">
            <span className="sr-only"></span>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieCards;
