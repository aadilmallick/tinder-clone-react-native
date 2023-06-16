import Swiper from "react-native-deck-swiper";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { shadow_styles } from "../../styles";
import { useEffect, useRef, useState } from "react";
import { dummyData } from "../../data/cardData";
import { FontAwesome } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../utils/config";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import Loading from "../ui/Loading";
import { generateId } from "../../utils/generateId";
import { useNavigation } from "@react-navigation/native";

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
  const { height: mobileHeight, width: mobileWidth } = useWindowDimensions();
  const [profiles, setProfiles] = useState(null);
  const { theUser: user } = useAuthStatus();
  const navigation = useNavigation();

  const responsive = (w, h) => {
    const responsiveWidth = (w / 375) * mobileWidth; // 375 is a base width used for scaling
    const responsiveHeight = (h / 812) * mobileHeight; // 812 is a base height used for scaling

    return {
      width: responsiveWidth,
      height: responsiveHeight,
    };
  };

  const responsivePixel = (pixelValue) => {
    const responsivePixelValue = (pixelValue / 375) * mobileWidth; // 375 is a base width used for scaling

    return responsivePixelValue;
  };

  console.log("responsive pixel", responsivePixel(100));

  useEffect(() => {
    const colRef = collection(db, "users");
    return onSnapshot(colRef, () => {});
  }, []);

  useEffect(() => {
    if (!user) return;

    let unsub;
    async function fetchCards() {
      const colRef = collection(db, "users");
      const passRef = collection(db, "users", user.uid, "passes");
      const swipeRef = collection(db, "users", user.uid, "swipes");

      const snapshotPass = await getDocs(passRef);
      const snapshotSwipe = await getDocs(swipeRef);
      const passedUserIdList = snapshotPass.docs.map((doc) => doc.id);
      const swipedUserIdList = snapshotSwipe.docs.map((doc) => doc.id);
      console.log("passed users", passedUserIdList);
      console.log("swiped users", swipedUserIdList);

      const hasPasses = Boolean(passedUserIdList.length != 0);
      const hasSwipes = Boolean(swipedUserIdList.length != 0);
      console.log(hasPasses, hasSwipes);

      const theRef =
        hasPasses || hasSwipes
          ? query(
              colRef,
              where("id", "not-in", [
                ...passedUserIdList,
                ...swipedUserIdList,
                "test",
              ])
            )
          : colRef;

      unsub = onSnapshot(theRef, (snapshot) => {
        if (!snapshot.empty) {
          const allProfiles = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          // console.log("all profiles not swiped or passed on", allProfiles);
          // filter in everbdy but ourselves.
          setProfiles(allProfiles.filter((prof) => prof.id !== user.uid));
        } else {
          setProfiles([]);
        }
      });
    }
    fetchCards();
    return () => {
      unsub();
    };
  }, [user]);

  const swipeLeft = async (cardIndex) => {
    // TODO: implement passes
    const match = profiles[cardIndex];
    if (!match || !profiles) return;

    const passRef = doc(db, "users", user.uid, "passes", match.id);
    await setDoc(passRef, { ...match });

    console.log("You swiped left");
  };

  const swipeRight = async (cardIndex) => {
    const match = profiles[cardIndex];
    console.log(match);
    if (!match || !profiles) return;

    // create a document in the swipes collection which contains the user you swiped on.
    const swipeRef = doc(db, "users", user.uid, "swipes", match.id);
    // add user you swiped on to your swipes list
    await setDoc(swipeRef, { ...match });

    console.log("You swiped right");

    const docSnap1 = await getDoc(doc(db, "users", user.uid));
    const docSnap2 = await getDoc(doc(db, "users", match.id));
    const loggedInUserProfile = { ...docSnap1.data(), id: docSnap1.id };
    const swipedOnUserProfile = { ...docSnap2.data(), id: docSnap2.id };

    // getting guy you swiped on already swiped on you
    const docSnap3 = await getDoc(
      doc(db, "users", match.id, "swipes", user.uid)
    );
    // if that guy actually exists
    if (docSnap3.exists()) {
      console.log("Hooray, you matched with", swipedOnUserProfile);

      // create a match document
      const matchRef = doc(db, "matches", generateId(user.uid, match.id));
      await setDoc(matchRef, {
        users: {
          [loggedInUserProfile.id]: { ...loggedInUserProfile },
          [swipedOnUserProfile.id]: { ...swipedOnUserProfile },
        },
        matchedUsers: [loggedInUserProfile.id, swipedOnUserProfile.id],
        timestamp: serverTimestamp(),
      });

      navigation.navigate("Match", {
        loggedInUserProfile,
        swipedOnUserProfile,
      });
    }
  };

  if (!user || !profiles) {
    return <Loading />;
  }

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
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={swipeRight}
          overlayLabels={overlayLabels}
          cardIndex={0}
          animateCardOpacity
          //* Have to manually refresh here, since resource intensive. Hot reload does not work.
          renderCard={(card) =>
            card ? (
              <Card card={card} key={card.id} />
            ) : (
              <View
                className="h-1/2 rounded-3xl overflow-hidden items-center justify-center bg-white"
                style={{ ...shadow_styles.shadow_sm }}
                key={Math.random()}
              >
                <Text className="text-xl font-bold">
                  Nobody is compatible with you 🤣🤣🤣
                </Text>
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
