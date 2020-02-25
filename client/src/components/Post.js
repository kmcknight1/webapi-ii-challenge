import React, { useEffect, useState } from "react";
import {
  Card,
  Modal,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Button,
  TextField
} from "@material-ui/core";
import axios from "axios";

import Comment from "./Comment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      outline: "none"
    }
  })
);

const Post = props => {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [contentsText, setContentsText] = useState("");

  const classes = useStyles();

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

  function editPost(body) {
    axios
      .put(`http://localhost:5000/api/posts/${props.post.id}`, body)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="post-card" style={{ margin: "1rem 5rem 1rem 5rem" }}>
      <Card>
        <h3>{props.post.title}</h3>
        <p
          style={{
            color: "maroon",
            fontWeight: "bold"
          }}
        >
          {props.post.contents}
        </p>
        <Button variant="contained" onClick={handleOpen}>
          Edit Post
        </Button>
        {comments.length === 0 ? (
          <p style={{ fontSize: "0.9rem" }}>This post has no comments</p>
        ) : (
          <h4>Comments: </h4>
        )}
        {comments.map((comment, index) => (
          <Comment comment={comment} index={index} />
        ))}
      </Card>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={open}
        onClose={handleClose}
      >
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
          className={classes.paper}
        >
          <Typography variant="h5" id="modal-title">
            Edit Post
          </Typography>
          <form
            onSubmit={() => {
              const body = {
                title: titleText,
                contents: contentsText
              };
              editPost(body);
            }}
          >
            <TextField
              variant="outlined"
              label="Title"
              value={titleText}
              onChange={e => {
                setTitleText(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              label="Contents"
              value={contentsText}
              onChange={e => {
                setContentsText(e.target.value);
              }}
            />
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit Changes</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Post;
