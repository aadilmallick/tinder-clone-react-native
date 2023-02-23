import { View, Text } from "react-native";
import React from "react";
import { useEffect } from "react";
import { collection, doc, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../../utils/config";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { useState } from "react";

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
        console.log("matched users", matchedUserList);
        setMatches(matchedUserList);
      }
    });

    return unsub;
  }, [user]);

  return (
    <View>
      <Text>ChatList</Text>
    </View>
  );
}
