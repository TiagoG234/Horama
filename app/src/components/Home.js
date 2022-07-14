import React, { Component, useContext, useState, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { UserContext } from "./UserContext";

const Home = () => {
  const [movie, setMovie] = useState("");
  const [review, setReview] = useState("");
  const { user, setUser } = useContext(UserContext);
  return (
    <span id="header" className="d-flex">
      <div className="mt-5 col-md-4 container justify-content-center">
        <form action="submit" className="form-inline">
          <div className="form-group mx-auto mb-2">
            <input
              onChange={(e) => setMovie(e.target.value)}
              type="search"
              placeholder="Insert movie"
            />
          </div>

          <Link to={movie !== "" ? `/${movie}` : {}}>
            <button className="btn btn-primary mb-2" type="submit">
              Submit
            </button>
          </Link>
        </form>
      </div>
    </span>
  );
};

export default Home;
