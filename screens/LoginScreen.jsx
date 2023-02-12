import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Alert,
} from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import useGoogleLogin from "../hooks/useGoogleLogin";
import { useDispatch } from "react-redux";

export default function LoginScreen() {
  const { loading, login } = useGoogleLogin();

  if (loading) {
    return <ActivityIndicator size={100} />;
  }
  return (
    <BackGround>
      {loading ? (
        <ActivityIndicator size={100} color="white" />
      ) : (
        <TouchableOpacity
          onPress={login}
          className="bg-white px-10 py-4 rounded-2xl self-center absolute bottom-24"
        >
          <Text className="text-lg font-semibold">
            Sign in and show your rizz
          </Text>
        </TouchableOpacity>
      )}
    </BackGround>
  );
}

function BackGround({ children }) {
  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <ImageBackground
        className="flex-1"
        source={{ uri: "https://tinder.com/static/tinder.png" }}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
}
