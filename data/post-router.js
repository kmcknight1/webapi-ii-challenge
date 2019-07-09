const express = require("express");
const router = express.Router();

const Posts = require("./db");

router.use(express.json());
router.use(cors());

router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Posts.findById(id)
    .then(post => {
      if (post && post.length) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  Posts.findPostComments(id)
    .then(posts => {
      if (posts && posts.length) {
        res.status(201).json(posts);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  if (!isValidPost(req.body)) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Posts.insert(req.body)
      .then(created => {
        res.status(201).json(created);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

//<-------------- ?Possible problem? --------------------->
router.post("/:id/comments", (req, res) => {
  if (!isValidComment(req.body)) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    Posts.insertComment(req.body)
      .then(comment => {
        res.status(201).json(comment);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the comment to the database"
        });
      });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!changes.title && !changes.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  Posts.update(id, changes)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

function isValidComment(comment) {
  const { text, post_id } = comment;

  return text && post_id;
}

function isValidPost(post) {
  const { title, contents } = post;

  return title && contents;
}

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Posts.remove(id)
    .then(deleted => {
      res.status(200).json({ message: "The post has been removed." });
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

module.exports = router;
