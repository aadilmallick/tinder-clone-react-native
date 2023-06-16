import { View, Text } from "react-native";
import React from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import ModalScreen from "./ModalScreen";
import MatchScreen from "./MatchScreen";
import ChatScreen from "./ChatScreen";
import MessageScreen from "./MessageScreen";
import DummyScreen from "./DummyScreen";

const Stack = createNativeStackNavigator();

// TODO: play around with rendering navigator or individual screens
export default function AuthStack() {
  const { loading, loggedIn, theUser } = useAuthStatus();
  const UnauthorizedStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );

  const AuthorizedStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* TODO: replace later, putting home screen first */}
      <Stack.Screen name="Dummy" component={DummyScreen} />

      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen
        name="Match"
        component={MatchScreen}
        options={{
          presentation: "transparentModal",
        }}
      />

      <Stack.Screen
        name="Modal"
        component={ModalScreen}
        options={{
          presentation: "transparentModal",
        }}
      />

      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Message" component={MessageScreen} />
    </Stack.Navigator>
  );

  if (loading) {
    return null;
  }

  return loggedIn ? <AuthorizedStack /> : <UnauthorizedStack />;
}
