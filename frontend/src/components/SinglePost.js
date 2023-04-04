import React from "react";
import useSinglePostContext from "../hooks/useSinglePostContext";
import SinglePostCss from "../styles/singlePost.module.css";
import InputCommnet from "./InputComment";
import useCommentContext from "../hooks/useCommentContext";
import Comment from "./Comment";
import DatePost from "./HomeComponens/DatePost";

export default function SinglePost() {
  const { singlePost, dispatch } = useSinglePostContext();

  const { comments } = useCommentContext();
  function hendleClick() {
    dispatch({ type: "setSinglePost", payload: null });
  }
  console.log(comments);
  return (
    <div className={SinglePostCss.container}>
      <button
        className={SinglePostCss.back}
        onClick={() => {
          hendleClick();
        }}
      >
        CANCLE
      </button>

      <div className={SinglePostCss.postContainer}>
        <div className={SinglePostCss.header}>
          {singlePost.userName && (
            <div className={SinglePostCss.userName}>
              user: {singlePost.userName}
            </div>
          )}
          {singlePost && (
            <div className={SinglePostCss.title}>{singlePost.title}</div>
          )}
        </div>

        {singlePost.subject && (
          <div className={SinglePostCss.subject}>
            Subject: {singlePost.subject}
          </div>
        )}
        {singlePost.jobType && (
          <div className={SinglePostCss.jobType}>
            Job-Type: {singlePost.jobType}
          </div>
        )}
        {singlePost.description && (
          <div className={SinglePostCss.description}>
            <p>Description</p>
            {singlePost.description}
          </div>
        )}
        {singlePost.price && (
          <div className={SinglePostCss.price}>
            Price: {singlePost.price} KM
          </div>
        )}
        {singlePost.rate && <div>{singlePost.rate}</div>}
        <DatePost date={singlePost.date} />
      </div>
      <InputCommnet />
      <div className={SinglePostCss.commentsCont}>
        {comments &&
          comments.map((comment) => {
            return <Comment key={comment._id} comment={comment} />;
          })}
      </div>
    </div>
  );
}
