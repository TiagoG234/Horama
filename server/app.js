const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "BaBa89hjkl%",
  database: "reviews_js",
});

app.get("/api/:movie/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT * FROM reviews WHERE (id,movie_id) = (?,?)",
      [req.params.id, req.params.movie],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(rows);
        }
      }
    );
  });
});

app.post("/add", (req, res) => {
  const { firstName, lastName } = req.body;
  console.log(JSON.stringify({ firstName: firstName, lastName: lastName }));
  res.cookie(
    "userLogin",
    JSON.stringify({ firstName: firstName, lastName: lastName })
  );
  res.send("");
});

app.get("/getcookies", (req, res) => {
  console.log(req.cookies);
  res.send(req.cookies);
});

app.delete("/deletecookies", (req, res) => {
  res.clearCookie("userLogin");
  res.end();
});

app.get("/api/:movie", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT * FROM reviews WHERE movie_id = ?",
      [req.params.movie],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(rows);
        }
      }
    );
  });
});

app.delete("/api/:movie/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "DELETE FROM reviews WHERE (id,movie_id) = (?,?)",
      [req.params.id, req.params.movie],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(`Removed row with id: ${req.params.id}`);
        }
      }
    );
  });
});

app.post("/api/:movie", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const user = req.body.user;
    const review = req.body.review;
    const score = req.body.score;

    connection.query(
      "INSERT INTO reviews (user, review, score, movie_id) VALUES (?,?,?,?)",
      [user, review, score, req.params.movie],
      (err, rows) => {
        connection.release(); // return the connection to pool
        if (!err) {
          res.send(`Review to movie with ID ${req.params.movie} added.`);
        } else {
          console.log(err);
        }
      }
    );
  });
});

// app.put("/api", (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log(`connected as id ${connection.threadId}`);

//     const { id, user, review, score } = req.body;

//     connection.query(
//       "UPDATE reviews SET user = ?, review = ?, score = ? WHERE id = ?",
//       [user, review, score, id],
//       (err, rows) => {
//         connection.release(); // return the connection to pool

//         if (!err) {
//           res.send(`Beer with the name: ${user} has been added.`);
//         } else {
//           console.log(err);
//         }
//       }
//     );

//     console.log(req.body);
//   });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
