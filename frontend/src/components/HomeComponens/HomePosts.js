import React from "react";
import HomePostsCss from "../../styles/Home/homePosts.module.css";
import useSinglePostContext from "../../hooks/useSinglePostContext";
import DatePost from "./DatePost";
import noUserImg from "../../img/user-icon-linear-user-icon-gray-background-106603311.jpg";
//import { useNavigate } from "react-router-dom";
export default function HomePosts({ item }) {
  const { dispatch } = useSinglePostContext();
  //const navigate = useNavigate();
  function hendleClick() {
    dispatch({ type: "setSinglePost", payload: item });
    // navigate("/singlePost");
  }
  const url = !item.imgURL ? noUserImg : item.imgURL;
  const imgStyles = {
    backgroundImage: "url(" + url + ")",
    backgroundPosition: "center",
    backgroundSize: `cover`,
    backgroundRepeat: "no-repeat",
  };
  return (
    <div
      className={HomePostsCss.container}
      onClick={() => {
        hendleClick();
      }}
    >
      <div className={HomePostsCss.userPostContainer}>
        <div className={HomePostsCss.userPostImg} style={imgStyles}></div>
        <div className={HomePostsCss.userName}>{item.userName}</div>
      </div>

      <div className={HomePostsCss.title}>{item.title}</div>
      {item.description && <div>description: {item.description}</div>}
      {item.subject && <div>subject: {item.subject}</div>}
      {item.jobType && <div>job: {item.jobType}</div>}
      {item.price && <div>price: {item.price} KM</div>}
      {item.rate === 0 || !item.rate ? null : (
        <div className={HomePostsCss.starsCont}>
          {Array(parseInt(item.rate))
            .fill(0)
            .map((_, index) => {
              return (
                <div className={HomePostsCss.star} key={index}>
                  {" "}
                  &#9733;
                </div>
              );
            })}{" "}
        </div>
      )}

      {!item.date ? null : <DatePost date={item.date} />}
    </div>
  );
}
