import React, { useEffect, useState } from "react";
import axios from "axios";

const Comment = props => {
  return (
    <>
      <p>
        {`${props.index + 1}) `}
        {props.comment.text}
      </p>
    </>
  );
};

export default Comment;
