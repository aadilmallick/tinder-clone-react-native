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
  const UnauthorizedStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );

  const AuthorizedStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );

  if (loading) {
    return null;
  }

  return loggedIn ? <AuthorizedStack /> : <UnauthorizedStack />;
}