import React, { useEffect, useRef, useState } from "react";
import useSinglePostContext from "../hooks/useSinglePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import useCommentContext from "../hooks/useCommentContext";
import InputCommentCss from "../styles/inputComment.module.css";
import InputRateStars from "./InputRateStars";

function InputComment() {
  const text = useRef("");
  const { singlePost, dispatch: updateSinglePost } = useSinglePostContext();
  const { state } = useAuthContext();
  const userName = state.user.name;
  const [rate, setRate] = useState(0);
  const { comments, dispatch: upadateComment } = useCommentContext();

  useEffect(() => {
    setRate(0);
  }, [singlePost]);
  async function postComment(e) {
    e.preventDefault();
    if (text.current.value === "") return;
    console.log(rate);
    console.log(singlePost._id);
    const res = await fetch("http://localhost:4000/api/comments/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Berar ${state.user.token}`,
      },
      body: JSON.stringify({
        content: text.current.value,
        postId: singlePost._id,
        userName: userName,
        rate: rate,
      }),
    });
    const json = await res.json();
    console.log(json);
    if (res.ok) {
      upadateComment({ type: "add", payload: json.newComment });
      updateSinglePost({ type: "setSinglePost", payload: json.postRate });
      setRate(0);
    }
    text.current.value = "";
  }

  function isRated() {
    let copy = comments;

    console.log(state.user);
    copy = copy.filter((comment) => {
      if (comment.rate !== 0 && comment.userName === state.user.name) {
        return comment;
      }
    });

    console.log(copy);
    return copy.length > 0;
  }
  return (
    <div className={InputCommentCss.container}>
      <form
        onSubmit={(e) => postComment(e)}
        className={InputCommentCss.formCont}
      >
        {isRated() ? null : (
          <InputRateStars rateValue={rate} onChange={setRate} />
        )}
        <div>
          <input
            className={InputCommentCss.input}
            type="text"
            ref={text}
            placeholder="Comment"
          />
          <button className={InputCommentCss.submit} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputComment;
