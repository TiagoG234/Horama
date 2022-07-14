import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Home from "./Home";
import { Image } from "react-bootstrap";
import rottenTomatoes from "./images/Rotten_Tomatoes.svg.png";
import imdbLogo from "./images/imdb-logo.png";
import imgNotFound from "./images/notFound.jpg";
import metacriticLogo from "./images/Metacritic.svg.png";

const MovieDetail = () => {
  const { id } = useParams();
  const hasFetched = useRef(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const listedKeys = [
    "Title",
    "Year",
    "Rated",
    "Released",
    "Runtime",
    "Genre",
    "Director",
    "Writer",
    "Actors",
    "Awards",
    "Box Office",
    "Production",
  ];
  useEffect(() => {
    if (!hasFetched.current) {
      fetch(`http://omdbapi.com/?apikey=470179fa&i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data);
          setIsLoading(true);
          document.title = `${data.Title} (${data.Year})`;
        });
      hasFetched.current = true;
    }
  }, [id]);

  return (
    <>
      <div className="col-md-9 mx-auto mt-5 mb-5">
        <div className="d-flex justify-content-left">
          {isLoading ? (
            movies.length !== 0 ? (
              <>
                <>
                  <div className="inline-flex px-5">
                    <Image
                      src={
                        movies.Poster !== "N/A" ? movies.Poster : imgNotFound
                      }
                      width={300}
                      height={450}
                      className="img-no-hover"
                    />
                    <div className="container mt-4 align-items-center">
                      <div className="row justify-content-center align-items-center">
                        <Link to={`/review/${id}`}>
                          <button className="btn btn-secondary w-50">
                            Add review! {"    "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-plus-circle"
                              viewBox="0 0 20 20"
                            >
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex col-lg-7 justify-content-left p-0">
                    <div className="d-flex col-md-10 pl-5 ml-5">
                      <h1>{movies.Title}</h1>
                    </div>
                    <div className="d-flex col-md-10 pl-5 ml-5">
                      <p>{movies.Plot}</p>
                    </div>
                    <div className="d-flex col-md-10 pl-5 ml-5 justify-content-left">
                      <ul className="list-group justify-content-left">
                        {Object.keys(movies)
                          .filter((value) => {
                            return listedKeys.includes(value);
                          })
                          .map((key, index) => {
                            return (
                              <li
                                className="list-group-item border-0 p-0"
                                key={key}
                              >
                                <p>
                                  <b>{`${key}:`}</b>
                                  {` ${movies[key]}`}
                                </p>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                    <div className="pt-1 container text-center mb-5 pb-5">
                      <div className="row">
                        <div className="col-lg-2">
                          <>
                            {movies.Ratings.filter(
                              (obj) => obj.Source === "Rotten Tomatoes"
                            ).length !== 0 ? (
                              <h1>
                                {
                                  <>
                                    {`${
                                      movies.Ratings.filter(
                                        (obj) =>
                                          obj.Source === "Rotten Tomatoes"
                                      )[0].Value
                                    }`}
                                    <a
                                      href={`https://rottentomatoes.com/m/${movies.Title.replaceAll(
                                        " ",
                                        "_"
                                      )}`}
                                    >
                                      <Image
                                        src={rottenTomatoes}
                                        width={100}
                                      ></Image>
                                    </a>
                                  </>
                                }
                              </h1>
                            ) : (
                              <>
                                <h1>N/A</h1>
                                <Image src={rottenTomatoes} width={100}></Image>
                              </>
                            )}
                          </>
                        </div>
                        <div className="col-lg-3">
                          {movies.imdbRating !== "N/A" ? (
                            <>
                              <h1>{`${movies.imdbRating}/10`}</h1>
                              <a
                                href={`https://imdb.com/title/${movies.imdbID}`}
                              >
                                <Image src={imdbLogo} width={100}></Image>
                              </a>
                            </>
                          ) : (
                            <Image src={imdbLogo} width={100}></Image>
                          )}
                        </div>

                        <div className="col-lg-3">
                          {movies.Metascore !== "N/A" ? (
                            <>
                              <h1>
                                {movies.Metascore !== "N/A"
                                  ? `${movies.Metascore}/100`
                                  : "N/A"}
                              </h1>
                              <a
                                href={`https://metacritic.com/movie/${movies.Title.toLowerCase().replaceAll(
                                  " ",
                                  "-"
                                )}`}
                              >
                                <Image src={metacriticLogo} width={100}></Image>
                              </a>
                            </>
                          ) : (
                            <>
                              <h1>
                                {movies.Metascore !== "N/A"
                                  ? `${movies.Metascore}/100`
                                  : "N/A"}
                              </h1>
                              <Image src={metacriticLogo} width={100}></Image>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                <div className="logo">
                  <a href={`https://www.imdb.com/title/${movies.imdbID}`}>
                    <Image src={imdbLogo} width={100}></Image>
                  </a>
                </div>
              </>
            ) : (
              <Navigate to="/" />
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
