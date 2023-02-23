import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useEffect } from "react";
import { collection, doc, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../../utils/config";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { useState } from "react";
import Loading from "../ui/Loading";
import { useNavigation } from "@react-navigation/native";

export default function ChatList() {
  const { theUser: user } = useAuthStatus();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user) return;

    const matchRef = query(
      collection(db, "matches"),
      where("matchedUsers", "array-contains", user.uid)
    );
    const unsub = onSnapshot(matchRef, (snapshot) => {
      if (!snapshot.empty) {
        const matchedUserList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMatches(matchedUserList);
      }
    });

    return unsub;
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  if (matches.length === 0) {
    return (
      <View className="justify-center items-center flex-1">
        <Text>No matches...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatRow matchInfo={{ ...item }} userId={user.uid} />
      )}
      contentContainerStyle={{
        paddingTop: 24,
      }}
    />
  );
}

function ChatRow({ matchInfo, userId }) {
  const matchId = matchInfo.matchedUsers.filter((id) => id !== userId)[0];
  const matchedUser = matchInfo.users[matchId];
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="border-b-gray-300 border-b p-4 flex-row items-center"
      onPress={() =>
        navigation.navigate("Message", {
          matchedUser,
          matchId: matchInfo.id,
        })
      }
    >
      <Image
        source={{ uri: matchedUser.photoURL }}
        className="h-12 w-12 rounded-full"
      />
      <View className="px-4">
        <Text className="text-lg font-bold">{matchedUser.name}</Text>
        <Text className="">Say Hi!</Text>
      </View>
    </TouchableOpacity>
  );
}
