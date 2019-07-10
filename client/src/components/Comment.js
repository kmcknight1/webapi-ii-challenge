import React, { useEffect, useState } from "react";
import axios from "axios";

const Comment = props => {
  return (
    <>
      <p>{props.comment.text}</p>
    </>
  );
};

export default Comment;
