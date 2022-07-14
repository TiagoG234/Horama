import React, { useEffect, useContext, useState } from "react";
import NavigBar from "./NavigBar";
import { UserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import axios from "axios";

const Welcome = () => {
  const { user, setUser } = useContext(UserContext);
  const [noUser, setNoUser] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("oi");
    axios
      .post("/add", { firstName: user.firstName, lastName: user.lastName })
      .then(() => {
        console.log("cookie sent");
      });
    return navigate("/");
  };

  const deleteUser = () => {
    axios.delete("/deletecookies").then(console.log("cookie deleted"));
    setNoUser(true);
    setUser("");
  };

  useEffect(() => {
    document.title = "Welcome";
    axios.get("/getcookies").then((data) => {
      if ("userLogin" in data.data) {
        setUser(JSON.parse(data.data.userLogin));
        setNoUser(false);
      } else {
        setNoUser(true);
      }
    });
  }, [noUser]);

  if (noUser === true) {
    return (
      <div className="container col-lg-2">
        <div className="mt-5 col-lg-100 justify-content-center align-items-center">
          <h1>Welcome!</h1>
          <form
            action="submit"
            className="form-inline mt-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                className="form-control mb-3"
                onChange={(e) => {
                  setUser({
                    firstName: e.target.value,
                    lastName: user.lastName,
                  });
                }}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="form-control"
                onChange={(e) => {
                  setUser({
                    firstName: user.firstName,
                    lastName: e.target.value,
                  });
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container col-lg-2">
        <div className="mt-5 col-lg-100 justify-content-center align-items-center">
          <h1>Welcome!</h1>
        </div>
        <button className="btn btn-danger mt-3" onClick={() => deleteUser()}>
          Delete User
        </button>
      </div>
    );
  }
};

export default Welcome;
