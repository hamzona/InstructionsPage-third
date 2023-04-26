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

      const res = await fetch(
        `http://localhost:4000/api/users/getUsr/${user.name}`
      );
      const json = await res.json();

      const final = { ...json, token: user.token };
      dispatch({ type: "singup-login", payload: final });
    };
    setting();
  }, []);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
