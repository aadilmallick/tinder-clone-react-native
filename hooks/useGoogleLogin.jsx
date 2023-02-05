import { View, Text } from "react-native";
import React from "react";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../utils/config";

export default function useGoogleLogin() {
  const [loading, setLoading] = useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "801544109335-boni58aqsli76ok6bnnog7dil11227q6.apps.googleusercontent.com",
    androidClientId:
      "992700783860-s0rkf5t42v7nminbjstnc1a4t4un3ok2.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      async function t() {
        setLoading(true);
        try {
          const { id_token } = response.params;
          const credential = GoogleAuthProvider.credential(id_token);
          const res = await signInWithCredential(auth, credential);
          const { displayName, email, photoURL, uid } = res.user;
          console.log("success", res.user);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
      t();
    }
  }, [response]);

  function login() {
    promptAsync({ showInRecents: true });
  }

  return { login, loading };
}
