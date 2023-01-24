import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

export default function LoginScreen() {
  const [loading, setLoading] = React.useState(false);
  const googleLogin = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithRedirect(auth, provider);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <StatusBar />
      <View className="flex-1 bg-gray-200">
        <Text>LoginScreen</Text>
        <TouchableOpacity
          onPress={googleLogin}
          className="bg-white px-8 py-2 rounded-lg"
        >
          <Text className="text-lg text-center">Sign in</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
