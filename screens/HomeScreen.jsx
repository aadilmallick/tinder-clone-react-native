import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useSignOut } from "../hooks/useSignOut";
import { useAuthStatus } from "../hooks/useAuthStatus";
import HomeHeader from "../components/Home/HomeHeader";
import { SwiperView } from "../components/Home/SwiperView";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/config";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/ui/Loading";
export default function HomeScreen() {
  const { theUser: user, loading } = useAuthStatus();
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);

    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setCurrentUser({ ...docSnap.data(), id: docSnap.id });
      } else {
        navigation.navigate("Modal");
      }
    });
  }, [user]);

  return (
    <>
      <StatusBar />
      <SafeAreaView className="flex-1 bg-white">
        <HomeHeader />
        <SwiperView />
        {/* <TouchableOpacity onPress={logout} className="p-4 bg-gray-50 rounded">
          <Text>Sign out</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    </>
  );
}
