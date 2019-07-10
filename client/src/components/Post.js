import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import axios from "axios";

import Comment from "./Comment";

const Post = props => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${props.id}/comments`)
      .then(res => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="post-card" style={{ margin: "1rem 4rem 1rem 4rem" }}>
      <Card>
        <h3>{props.post.title}</h3>
        <p style={{ color: "maroon", fontWeight: "bold" }}>
          {props.post.contents}
        </p>
        {comments.length > 0 && <h4>Comments: </h4>}
        {comments.map(comment => (
          <Comment comment={comment} />
        ))}
      </Card>
    </div>
  );
};

export default Post;
