import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./store";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import AuthStack from "./screens/AuthStack";
import { db } from "./utils/config";
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}
