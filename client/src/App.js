import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import Post from "./components/Post";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then(res => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Super Cool Blog</h1>
        <span style={{ padding: "0.2rem", backgroundColor: "maroon" }}>
          <p>Welcome to this super cool blog! Check out these amazing posts!</p>
        </span>
        {posts.length === 0 ? (
          <h1>Loading Posts...</h1>
        ) : (
          posts.map(post => <Post post={post} id={post.id} />)
        )}
      </header>
    </div>
  );
}

export default App;
