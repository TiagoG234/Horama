import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";

const Review = () => {
  const [user, setUser] = useState("");
  const [review, setReview] = useState("");
  const [availableReviews, setAvailableReviews] = useState([]);
  const { id } = useParams();
  const alert = document.getElementById("reviewEmpty");
  const fetchData = () => {
    axios.get(`/api/${id}`).then((response) => {
      console.log(response.data);
      setAvailableReviews(response.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    review !== ""
      ? axios
          .post(`/api/${id}`, {
            user: user,
            review: review,
            score: 1,
          })
          .then(() => {
            axios.get(`/api/${id}`).then((response) => {
              console.log(response.data);
              setAvailableReviews(response.data);
            });
          })
      : alert.classList.remove("collapse");
    setTimeout(() => alert.classList.add("collapse"), 3000);
    e.target.reset();
    setReview("");
    setUser("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    axios.delete(`/api/${id}/${e.currentTarget.id}`).then(() => {
      axios.get(`/api/${id}`).then((response) => {
        console.log(response.data);
        setAvailableReviews(response.data);
      });
    });
  };

  return (
    <div className="col-lg-20">
      <div
        className="align-items-center mx-5 col-lg-4 border-round alert alert-danger collapse"
        style={{ zIndex: 999, position: "fixed", top: "10px", left: "350px" }}
        role="alert"
        id="reviewEmpty"
      >
        <span className="text-center align-items-center">
          <h4 className="text-center ">Please insert a review!</h4>
        </span>
      </div>
      <div className="d-flex">
        <div className="col-md-4 mx-5">
          <form
            className="form-inline"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="form-group col-lg-100 mx-auto mb-5">
              <input
                type="text"
                placeholder="User"
                className="mb-4 form-control"
                onChange={(e) => {
                  setUser(e.target.value);
                }}
              />
              <textarea
                placeholder="Insert review"
                className="h-100 form-control rounded-0"
                onChange={(e) => {
                  setReview(e.target.value);
                }}
                rows="5"
              />
            </div>

            <button className="btn btn-primary mb-2" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="text-center col-md-4 mx-5">
          <h3>Reviews</h3>
          {availableReviews.map((data) => {
            return (
              <div
                className="mb-4 border border-info p-2 rounded align-items-left py-1"
                key={`${data.id}`}
              >
                <p className="text-left">
                  <b>User:</b> {data.user}
                  <br />
                  <b>Score:</b> {data.score}
                  <br />
                  <b>Review:</b> {data.review}
                </p>
                <button
                  className="btn btn-danger"
                  id={`${data.id}`}
                  onClick={handleClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-x-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>{" "}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Review;
