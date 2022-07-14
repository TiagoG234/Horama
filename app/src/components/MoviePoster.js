import React, { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { Image, Container } from "react-bootstrap";
import imgNotFound from "./images/notFound.jpg";

const MoviePoster = ({ name, year, id, poster }) => {
  return (
    <div className="col-md-2">
      <Link to={`/titles/${id}`}>
        {poster !== "N/A" ? (
          <Image src={poster} width={150} height={225} className="img"></Image>
        ) : (
          <Image
            src={imgNotFound}
            width={150}
            height={225}
            className="img"
          ></Image>
        )}
      </Link>
      <p className="text-sm-center text-wrap">{`${name} (${year})`}</p>
    </div>
  );
};

export default MoviePoster;
