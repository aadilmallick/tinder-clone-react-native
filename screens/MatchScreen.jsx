import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function MatchScreen() {
  let { loggedInUserProfile, swipedOnUserProfile } = useRoute();
  const navigation = useNavigation();
  if (!loggedInUserProfile || !swipedOnUserProfile) {
    loggedInUserProfile = {
      age: 18,
      name: "Aadil",
      occupation: "CEO of sex",
      photoURL:
        "https://lh3.googleusercontent.com/a/AEdFTp4FwLiMMCGHE-RmFnSCVrQEpaTmog1acVnaLvQD1Q=s96-c",
    };
    swipedOnUserProfile = {
      age: 18,
      name: "Mallick",
      occupation: "Homeless criminal",
      photoURL:
        "https://lh3.googleusercontent.com/a/AEdFTp5FQwYz9y_iDQgoFv7MUsUe_O8MLgtjx8N-baZx=s96-c",
    };
  }

  return (
    <>
      <StatusBar />
      <SafeAreaView className="flex-1 bg-red-400/80 pt-20">
        <View className="p-4 space-y-8 relative flex-1">
          <Image
            source={{ uri: "https://links.papareact.com/mg9" }}
            className="h-20 w-full"
            resizeMode="contain"
          />
          <Text className="text-center text-white text-lg">
            {`You and ${swipedOnUserProfile.name} have rizzed each other up!`}
          </Text>
          <View className="flex-row justify-around mb-24">
            <Image
              className="h-32 w-32 rounded-full"
              source={{ uri: loggedInUserProfile.photoURL }}
            />
            <Image
              className="h-32 w-32 rounded-full"
              source={{ uri: swipedOnUserProfile.photoURL }}
            />
          </View>
          <TouchableOpacity
            className="bg-white p-8 rounded-full"
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
              navigation.navigate("Chat");
            }}
          >
            <Text className="text-center font-light text-2xl">
              Show your unspoken rizz
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
