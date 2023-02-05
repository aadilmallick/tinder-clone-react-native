import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useSignOut } from "../hooks/useSignOut";
import { useAuthStatus } from "../hooks/useAuthStatus";
export default function HomeScreen() {
  const { isError, isLoading, logout } = useSignOut();
  const { theUser, loggedIn } = useAuthStatus();
  if (isLoading) {
    return <ActivityIndicator size={100} />;
  }

  return (
    <>
      <StatusBar />
      <SafeAreaView className="flex-1 bg-gray-200">
        <Text>HomeScreen</Text>
        {/* TODO: implement logout */}
        <TouchableOpacity onPress={logout} className="p-4 bg-gray-50 rounded">
          <Text>Sign out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
