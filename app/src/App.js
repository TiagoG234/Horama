import "./components/index.css";
import {
  Link,
  Navigate,
  useNavigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Home from "./components/Home";
import MovieCards from "./components/MovieCards";
import MovieDetail from "./components/MovieDetail";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigBar from "./components/NavigBar";
import Review from "./components/Review";
import { UserContext } from "./components/UserContext";

const App = () => {
  const [user, setUser] = useState("");
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <NavigBar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:q" element={<MovieCards />} />
            <Route path="/titles/:id" element={<MovieDetail />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/review/:id" element={<Review />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
};

export default App;
