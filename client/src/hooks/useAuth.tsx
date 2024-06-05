// This is a custom hook that uses the useContext hook from React to access the AuthContext.
// This context provide authentication state or functionality to components in our application.
// functional component can easily access the context without having to use useContext(AuthContext) every time.

import { useContext } from "react";
import { AuthContext } from "@/context/authContextProvider";

const useAuth = () => {

  const context = useContext(AuthContext);

  if(!context)throw new Error("useAuth must be used within a AuthProvider");

  return context;
};

export default useAuth;