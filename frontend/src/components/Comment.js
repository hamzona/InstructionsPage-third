import React from "react";
import CommentsCss from "../styles/comments.module.css";
export default function Comment({ comment }) {
  return (
    <div className={CommentsCss.container}>
      {comment.rate && (
        <div className={CommentsCss.starsCont}>
          {Array(comment.rate)
            .fill(0)
            .map((_, index) => {
              return (
                <div key={index} className={CommentsCss.star}>
                  {" "}
                  &#9733;
                </div>
              );
            })}
        </div>
      )}
      {comment.content !== "" ? (
        <div className={CommentsCss.content}>{comment.content}</div>
      ) : null}
      <div className={CommentsCss.userName}>{comment.userName}</div>
    </div>
  );
}
