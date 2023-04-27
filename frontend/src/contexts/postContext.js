import { createContext, useEffect, useReducer, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const PostContext = createContext();

function updateReducer(state, action) {
  switch (action.type) {
    case "setPosts":
      return action.payload;
    case "addPost":
      return [action.payload, ...state];
    case "deletePost":
      return state.filter((item) => item._id !== action.payload._id);
    case "updatePosts":
    default:
      return state;
  }
}
export function PostContextProvider({ children }) {
  const [state, dispatch] = useReducer(updateReducer, null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  /*filters */
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [jobType, setJobType] = useState(null);
  const [error, setError] = useState(null);

  /*sort */
  const [sortBy, setSortBy] = useState(null);
  useEffect(() => {
    let params = new URLSearchParams(
      `page=${page}&limit=20&search=${search}&min=${minPrice}&max=${maxPrice}&jobType=${jobType}&sortBy=${sortBy}`
    );
    if (!jobType) {
      params.delete("jobType");
    }
    if (!search) {
      params.delete("search");
    }
    if (!minPrice) {
      params.delete("min");
    }
    if (!maxPrice) {
      params.delete("max");
    }
    if (!jobType) {
      params.delete("jobType");
    }
    subjects.forEach((subject) => {
      params.append("subject", subject);
    });
    console.log(params.toString());
    const getAllPosts = async () => {
      const res = await fetch(
        `http://localhost:4000/api/posts/allPosts?${params.toString()}`
      );
      const json = await res.json();

      console.log(json);
      const resWithImg = await Promise.all(
        json.data.map(async (post) => {
          if (!post.imgName) return post;

          const img = await fetch(
            `http://localhost:4000/api/img/getImgPublic/${post.imgName}`
          );

          const blob = await img.blob();
          const imgURL = URL.createObjectURL(blob);

          const imageObj = { imgURL: imgURL, ...post };
          return imageObj;
        })
      );
      if (res.ok) {
        setPages(json.pages);
        dispatch({ type: "setPosts", payload: resWithImg });
        setError(null);
      } else {
        setError(json.error);
      }
    };
    getAllPosts();
  }, [page, search, subjects, minPrice, maxPrice, jobType, sortBy]);
  return (
    <PostContext.Provider
      value={{
        state,
        dispatch,
        page,
        setPage,
        pages,
        setSubjects,
        setSearch,
        setMaxPrice,
        setMinPrice,
        setJobType,
        setSortBy,
        error,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
