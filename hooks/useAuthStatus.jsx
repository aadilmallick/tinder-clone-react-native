import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theUser, setTheUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setTheUser(user);
      } else {
        setTheUser(null);
        setLoggedIn(false);
      }
      setLoading(false);
    });

    // TODO: might have to add cleanup function.
  }, []);

  return { loggedIn, loading, theUser };
};
