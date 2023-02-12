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
import HomeHeader from "../components/Home/HomeHeader";
import { SwiperView } from "../components/Home/SwiperView";
export default function HomeScreen() {
  const { isError, isLoading, logout } = useSignOut();
  const { theUser, loggedIn, loading } = useAuthStatus();

  if (loading || isLoading) {
    return <ActivityIndicator size={100} />;
  }

  return (
    <>
      <StatusBar />
      <SafeAreaView className="flex-1 bg-white">
        <HomeHeader />
        {/* TODO: implement logout */}
        <SwiperView />
        {/* <TouchableOpacity onPress={logout} className="p-4 bg-gray-50 rounded">
          <Text>Sign out</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    </>
  );
}
