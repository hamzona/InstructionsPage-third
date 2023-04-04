import { createContext, useReducer } from "react";

export const SinglePost = createContext();
function updateReducer(state, action) {
  console.log(action.payload);
  switch (action.type) {
    case "setSinglePost":
      return action.payload;
    default:
      return state;
  }
}
export function SinglePostProvider({ children }) {
  const [singlePost, dispatch] = useReducer(updateReducer, null);
  //  console.log(singlePost);
  return (
    <SinglePost.Provider value={{ singlePost, dispatch }}>
      {children}
    </SinglePost.Provider>
  );
}
