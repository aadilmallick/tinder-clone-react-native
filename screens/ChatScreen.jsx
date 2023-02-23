import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import ChatHeader from "../components/Chat/ChatHeader";
import { StatusBar } from "expo-status-bar";
import ChatList from "../components/Chat/ChatList";

export default function ChatScreen() {
  return (
    <>
      <StatusBar />
      <SafeAreaView className="flex-1 bg-white">
        <ChatHeader title="Chat" />
        <ChatList />
      </SafeAreaView>
    </>
  );
}
