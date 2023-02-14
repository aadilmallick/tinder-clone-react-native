import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import ChatHeader from "../components/Chat/ChatHeader";

export default function ChatScreen() {
  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <ChatHeader title="Chat" />
      </SafeAreaView>
    </>
  );
}
