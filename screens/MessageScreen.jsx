import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import ChatHeader from "../components/Chat/ChatHeader";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Loading from "../components/ui/Loading";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../utils/config";
import { useEffect } from "react";

export default function MessageScreen() {
  const route = useRoute();
  const [message, setMessage] = useState("");
  const { matchedUser, matchId } = route.params;
  const [chatMessages, setChatMessages] = useState([]);
  const { theUser: user } = useAuthStatus();

  const onSubmitMessage = async () => {
    const messageRef = collection(db, "matches", matchId, "messages");
    await addDoc(messageRef, {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      message,
    });
    setMessage("");
  };

  useEffect(() => {
    const messageRef = query(
      collection(db, "matches", matchId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(messageRef, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(messages);
      setChatMessages(messages);
    });
    return unsub;
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 pb-4 bg-white">
      <ChatHeader title={matchedUser.name} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={chatMessages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.userId === user.uid)
              return <SenderMessage key={item.id} message={item.message} />;
            else
              return (
                <ReceiverMessage
                  key={item.id}
                  message={message}
                  userInfo={matchedUser}
                />
              );
          }}
        />
      </TouchableWithoutFeedback>
      {/* Maybe wrap everything in keyboard avoiding view? */}
      <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={10}>
        <View className="flex-row p-4 items-center justify-between bg-gray-100 mx-4 rounded-full">
          <TextInput
            placeholder="send message..."
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={onSubmitMessage}
            className="text-lg flex-[.9] px-2"
          />
          <TouchableOpacity>
            <FontAwesome name="send" color={"red"} size={24} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function SenderMessage({ message }) {
  return (
    <View className="bg-purple-500 rounded-lg px-5 py-3 mx-3 my-2 self-end rounded-tr-none">
      <Text className="text-white">{message}</Text>
    </View>
  );
}

function ReceiverMessage({ message, userInfo }) {
  return (
    <View className="bg-orange-500 rounded-lg px-5 py-3 mx-3 my-2 flex-row rounded-tr-none items-center">
      <Image
        source={{ uri: userInfo.photoURL }}
        className="h-12 w-12 rounded-full"
      />
      <Text className="text-white">{message}</Text>
    </View>
  );
}
