import Swiper from "react-native-deck-swiper";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { shadow_styles } from "../../styles";
import { useEffect, useRef, useState } from "react";
import { dummyData } from "../../data/cardData";
import { FontAwesome } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/config";

const overlayLabels = {
  left: {
    title: "NO RIZZ",
    style: {
      label: {
        textAlign: "right",
        color: "red",
      },
    },
  },
  right: {
    title: "GODLY RIZZ",
    style: {
      label: {
        textAlign: "left",
        color: "green",
      },
    },
  },
};

export function SwiperView() {
  const swiperRef = useRef(null);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function fetchCards() {}

    const colRef = collection(db, "users");
    return onSnapshot(colRef, (snapshot) => {
      if (!snapshot.empty) {
        setProfiles(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    });
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-1 -mt-6">
        <Swiper
          cards={profiles}
          ref={swiperRef}
          containerStyle={{
            backgroundColor: "transparent",
          }}
          stackSize={5}
          verticalSwipe={false}
          onSwipedLeft={() => {}}
          onSwipedRight={() => {}}
          overlayLabels={overlayLabels}
          cardIndex={0}
          animateCardOpacity
          //* Have to manually refresh here, since resource intensive. Hot reload does not work.
          renderCard={(card) =>
            card ? (
              <Card card={card} key={card.id} />
            ) : (
              <View
                className="h-3/4 rounded-3xl overflow-hidden"
                style={{ ...shadow_styles.shadow_sm }}
              >
                <Text>No cards</Text>
              </View>
            )
          }
        />
      </View>
      <SwiperButtons swiperRef={swiperRef} />
    </View>
  );
}

function Card({ card }) {
  return (
    <View
      className="h-3/4 rounded-3xl overflow-hidden"
      style={{ ...shadow_styles.shadow_sm }}
    >
      <View className="flex-1">
        <Image
          source={{ uri: card.photoURL }}
          className="h-full w-full object-cover"
        />
      </View>
      <View className="bg-white flex flex-row justify-between items-center px-4 py-2">
        <View>
          <Text className="capitalize text-lg font-semibold">{card.name}</Text>
          <Text className="capitalize">{card.occupation}</Text>
        </View>
        <Text className="text-xl font-bold">{card.age}</Text>
      </View>
    </View>
  );
}

function SwiperButtons({ swiperRef }) {
  return (
    <View className="flex-row justify-around mb-6">
      <TouchableOpacity
        className="bg-red-300 p-4 rounded-full"
        onPress={() => swiperRef.current.swipeLeft()}
      >
        <FontAwesome name="close" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-300 p-4 rounded-full"
        onPress={() => swiperRef.current.swipeRight()}
      >
        <FontAwesome name="check" size={30} />
      </TouchableOpacity>
    </View>
  );
}
