import { useContext } from "react";
import { AuthModalContext } from "@/context/authModalContextProvider";

const useAuthModal = () => {

  const context = useContext(AuthModalContext);

  if(!context)throw new Error("useAuthModal must be used within a AuthModalProvider");

  return context;
};

export default useAuthModal;