import { View, Text } from "react-native";
import React from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";

const Stack = createNativeStackNavigator();

// TODO: play around with rendering navigator or individual screens
export default function AuthStack() {
  const { loading, loggedIn, theUser } = useAuthStatus();
  console.log("loading", loading);
  console.log("loggedIn", loggedIn);

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {loggedIn && (
        <Stack.Screen
          name="Home"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
      {!loggedIn && (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
