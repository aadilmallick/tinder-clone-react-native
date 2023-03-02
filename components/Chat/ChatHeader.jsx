import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ChatHeader({ title }) {
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center pt-12 px-8 pb-4 space-x-12 border-b-gray-500 border-b">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-circle-left" size={30} color={"red"} />
      </TouchableOpacity>
      <Text className="text-2xl font-bold">{title}</Text>
    </View>
  );
}
