import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useSignOut } from "../../hooks/useSignOut";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, userLogout } from "../../features/user/userSlice";
import Loading from "../ui/Loading";

export default function HomeHeader() {
  const { theUser: user, loggedIn } = useAuthStatus();
  const { logout, isLoading } = useSignOut();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSignOut = () => {
    const idk = async () => {
      await logout();
    };
    Alert.alert(
      "Logout",
      "Do you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Ask me later pressed"),
          style: "cancel",
        },
        {
          text: "Sign out",
          onPress: idk,
        },
      ],
      { cancelable: true }
    );
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View className="flex flex-row p-4 justify-between items-center border-b border-b-gray-300">
      <TouchableOpacity onPress={onSignOut}>
        <Image
          className="h-10 w-10 rounded-full"
          source={{ uri: user?.photoURL }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
        <Image
          className="h-16 w-16 rounded-full"
          source={{ uri: "https://tinder.com/static/tinder.png" }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <FontAwesome name="wechat" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );
}
