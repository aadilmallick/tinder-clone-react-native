import { View, Text, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function usePreventBackButton(message) {
  const [canGoBack, setCanGoBack] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsub = navigation.addListener("beforeRemove", (e) => {
      if (canGoBack) {
        return;
      }

      e.preventDefault();
      ToastAndroid.show(message, ToastAndroid.SHORT);
    });

    return unsub;
  }, [canGoBack]);

  const enableGoBack = () => {
    setCanGoBack(true);
  };

  return { canGoBack, enableGoBack };
}
