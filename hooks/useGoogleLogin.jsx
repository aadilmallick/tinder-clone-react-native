import React from "react";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useState } from "react";
import { auth } from "../utils/config";
import * as WebBrowser from "expo-web-browser";
import { CLIENT_ID, ANDROID_CLIENT_ID } from "@env";

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleLogin() {
  const [loading, setLoading] = useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
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
