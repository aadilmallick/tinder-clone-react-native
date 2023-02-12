import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useNavigation } from "@react-navigation/native";
import usePreventBackButton from "../hooks/usePreventBackButton";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/config";

export default function ModalScreen() {
  const { theUser: user, loggedIn } = useAuthStatus();
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { canGoBack, enableGoBack } = usePreventBackButton(
    "Must provide information first"
  );
  let isFormComplete = Boolean(job) && Boolean(age) === true;

  useEffect(() => {
    if (!user) {
      return;
    }

    const unsub = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        const data = { ...docSnap.data(), id: docSnap.id };
        setJob(data.occupation);
        setAge(data.age);
        enableGoBack();
      }
    });

    return unsub;
  }, [user]);

  if (!loggedIn || !user) {
    return null;
  }

  const onSubmit = async () => {
    setLoading(true);
    const docRef = doc(db, "users", user?.uid);
    await setDoc(docRef, {
      occupation: job,
      age,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
      name: user.displayName,
    });
    enableGoBack();
    setLoading(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-black/70">
      <View className="m-4 bg-white flex-1 items-center space-y-2">
        <Image
          source={{ uri: "https://links.papareact.com/2pf" }}
          className="h-20 w-full"
          resizeMode="contain"
        />
        <Text className="text-center text-red-400 text-lg">
          Step 1: Enter your job
        </Text>
        <TextInput
          className="text-center text-xl p-2 border-b border-b-gray-300 w-3/4"
          placeholder="Enter occupation here"
          value={job}
          onChangeText={setJob}
        />
        <Text className="text-center text-red-400 text-lg ">
          Step 2: Enter your age
        </Text>
        <TextInput
          className="text-center text-xl p-2 border-b border-b-gray-300 w-3/4"
          placeholder="Enter age here"
          value={String(age)}
          keyboardType="decimal-pad"
          onChangeText={(text) => setAge(Number(text))}
        />
        <TouchableOpacity
          className={`rounded-xl  p-3 w-3/4 absolute bottom-10 ${
            !isFormComplete ? "bg-gray-400" : "bg-red-400"
          }`}
          onPress={onSubmit}
          disabled={!isFormComplete}
        >
          <Text className="text-center text-white text-xl">Update profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
