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

export default function HomeScreen() {
  const [loading, setLoading] = React.useState(false);
  const onLogout = async () => {
    setLoading(true);
    const auth = getAuth();
    await signOut(auth);
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <StatusBar />
      <SafeAreaView className="flex-1 bg-gray-200">
        <Text>HomeScreen</Text>
        <TouchableOpacity onPress={onLogout}>
          <Text>Sign out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
