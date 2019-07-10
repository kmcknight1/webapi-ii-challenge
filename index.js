const cors = require("cors");

const express = require("express");

// const Posts = require("./data/db");
const postsRouter = require("./data/post-router.js");

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h2>Web-API-Challenge-ii</h>
    <p>Server Side Routing with Express</p>
  `);
});

//use this router for any endpoints beginning with this endpoint
server.use("/api/posts", postsRouter);

server.listen(5000, () => {
  console.log("\n*** Server Running on http://localhost:5000 ***\n");
});
