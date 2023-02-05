import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import useGoogleLogin from "../hooks/useGoogleLogin";

export default function LoginScreen() {
  const { loading, login } = useGoogleLogin();

  if (loading) {
    return <ActivityIndicator size={100} />;
  }
  return (
    <>
      <StatusBar />
      <View className="flex-1 bg-gray-200">
        <Text>LoginScreen</Text>
        {/* TODO: implement login */}
        <TouchableOpacity
          onPress={login}
          className="bg-white px-8 py-2 rounded-lg"
        >
          <Text className="text-lg text-center">Sign in</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
