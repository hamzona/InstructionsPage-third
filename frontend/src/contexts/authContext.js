import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();
function updateReducer(state, action) {
  switch (action.type) {
    case "singup-login":
      return { user: action.payload };
    case "logout":
      return { user: null };
    default:
      return state;
  }
}
export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(updateReducer, { user: null });
  useEffect(() => {
    const setting = async () => {
      const user = await JSON.parse(localStorage.getItem("user"));

      if (!user) {
        return;
      }
      dispatch({ type: "singup-login", payload: user });
    };
    setting();
  }, []);
  /*
  useEffect(() => {
    console.log(state.user);
  }, [state]);*/
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
