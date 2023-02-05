import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  async function logout() {
    setIsLoading(true);
    try {
      const auth = getAuth();
      await signOut(auth);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsError(e.message);
      setIsLoading(false);
    }
  }

  return { logout, isLoading, isError };
};
