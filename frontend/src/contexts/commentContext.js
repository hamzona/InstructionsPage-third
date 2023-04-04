import { createContext, useEffect, useReducer } from "react";
import useSinglePostContext from "../hooks/useSinglePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
export const CommentContext = createContext();
function updateReducer(state, action) {
  console.log(action.payload);
  switch (action.type) {
    case "setComments":
      return action.payload;
    case "add":
      return [action.payload, ...state];
    case "delete":
      return state.filter((item) => item._id !== action.payload._id);
    default:
      return state;
  }
}

export function CommentContextProvider({ children }) {
  const [comments, dispatch] = useReducer(updateReducer, []);
  const { singlePost } = useSinglePostContext();
  const { state } = useAuthContext();
  useEffect(() => {
    if (singlePost === null) return;
    async function getData() {
      const res = await fetch(" http://localhost:4000/api/comments/all    ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Berar ${state.user.token}`,
        },
        body: JSON.stringify({ postId: singlePost._id }),
      });
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "setComments", payload: json });
      }
    }
    getData();
  }, [singlePost]);
  return (
    <CommentContext.Provider value={{ comments, dispatch }}>
      {children}
    </CommentContext.Provider>
  );
}
