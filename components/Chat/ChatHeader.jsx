import { View, Text } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function ChatHeader({ title }) {
  return (
    <View className="flex-row items-center pt-12 px-8 space-x-12">
      <FontAwesome name="arrow-circle-left" size={30} color={"red"} />
      <Text className="text-2xl font-bold">{title}</Text>
    </View>
  );
}
