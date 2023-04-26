import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMyPostsContext } from "../hooks/useMyPostsContext";
import ProfilCss from "../styles/profil.module.css";
import MyPosts from "./MyPosts";

export default function Profil() {
  const { state, dispatch } = useAuthContext();

  const { state: myPosts } = useMyPostsContext();
  const [imgUrl, setImgUrl] = useState(null);
  const navigate = useNavigate();
  function hendleClick() {
    localStorage.removeItem("user");
    dispatch({ type: "logout" });
    navigate("/");
  }
  console.log(state);
  console.log(myPosts);

  useEffect(() => {
    async function getImg() {
      const res = await fetch(
        `http://localhost:4000/api/img/getImg/${state.user.imgName}`,
        {
          headers: {
            Authorization: `Berar ${state.user.token}`,
          },
        }
      );
      const blob = await res.blob();
      const imgURL = URL.createObjectURL(blob);
      console.log(imgURL);
      setImgUrl(imgURL);
    }
    getImg();
  }, [state]);

  const imgStyles = {
    backgroundImage: "url(" + imgUrl + ")",
    backgroundPosition: "center",
    backgroundSize: `cover`,
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className={ProfilCss.container}>
      <div className={ProfilCss.profilContainer}>
        <Link className={ProfilCss.back} to="/">
          BACK
        </Link>
        <Link to="/imgUpload">UploadImg</Link>
        {state.user.imgName && (
          <div className={ProfilCss.profilImg} style={imgStyles} />
        )}
        {state.user && <div className={ProfilCss.name}> {state.user.name}</div>}
        {state.user && (
          <div className={ProfilCss.email}>email: {state.user.email}</div>
        )}

        <button
          className={ProfilCss.logout}
          onClick={() => {
            hendleClick();
          }}
        >
          Log out
        </button>
      </div>

      <div className={ProfilCss.postsContainer}>
        <Link className={ProfilCss.inputLink} to="/input">
          Upload new post
        </Link>
        <div className={ProfilCss.titleMyPosts}>My posts:</div>
        {myPosts &&
          myPosts.map((item) => {
            return <MyPosts key={item._id} item={item} />;
          })}
      </div>
    </div>
  );
}
