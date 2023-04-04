import React, { useRef } from "react";
import SearchCss from "../../styles/Home/search.module.css";
import { usePostContext } from "../../hooks/usePostContext";
export default function Search() {
  const search = useRef("");
  const { setSearch, setPage } = usePostContext();
  function hendleSubmit(e) {
    e.preventDefault();
    setSearch(search.current.value);
    setPage(1);
  }
  return (
    <div className={SearchCss.container}>
      <form
        onSubmit={(e) => {
          hendleSubmit(e);
        }}
      >
        <input className={SearchCss.inputTag} ref={search} type="text" />
        <button className={SearchCss.buttonTag} type="submit">
          search
        </button>
      </form>
    </div>
  );
}
