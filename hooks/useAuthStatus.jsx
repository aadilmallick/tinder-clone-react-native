import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theUser, setTheUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setTheUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
      }
      setLoading(false);
    });
  }, []);

  return { loggedIn, loading, theUser };
};
