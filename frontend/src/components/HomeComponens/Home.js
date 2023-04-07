import React, { useState } from "react";
import { usePostContext } from "../../hooks/usePostContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import HomePosts from "./HomePosts";
import HomeCss from "../../styles/Home/home.module.css";
import Pagination from "./Pagination";
import Filter from "./Filter";
import Search from "./Search";
import SortMenu from "./SortMenu";
function Home() {
  const { state, error } = usePostContext();
  const { state: stateUser } = useAuthContext();
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  return (
    <div className={HomeCss.container}>
      <div className={HomeCss.homeNav}>
        {stateUser.user !== null ? (
          <Link className={HomeCss.profilLink} to="/profil">
            My profil: {stateUser.user.name}
          </Link>
        ) : (
          <div className={HomeCss.loginSingupCont}>
            <Link className={HomeCss.loginLink} to="/login">
              login
            </Link>
            {"  "}
            <Link className={HomeCss.singupLink} to="/singup">
              singup
            </Link>
          </div>
        )}
      </div>
      <Search />

      <button
        className={HomeCss.filterBtn}
        onClick={() =>
          setIsFilter((prev) => {
            return !prev;
          })
        }
      >
        Filter
      </button>
      {isFilter ? <Filter /> : null}
      <button
        className={HomeCss.sortBtn}
        onClick={() => setIsSort((prev) => !prev)}
      >
        SORT
      </button>
      {isSort ? <SortMenu /> : null}
      <div className={HomeCss.posts}>
        {error ? (
          <div>Error:{error}</div>
        ) : (
          state &&
          state.map((item) => {
            return <HomePosts key={item._id} item={item} />;
          })
        )}
      </div>

      <Pagination />
    </div>
  );
}

export default Home;
