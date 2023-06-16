import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { scale, moderateScale } from "../utils/dimensions";
import { FontAwesome } from "@expo/vector-icons";

export default function DummyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      {/* <View className="flex-row justify-around px-12 space-x-8 mt-12">
        <TouchableOpacity className="bg-[#E94057] flex-1 rounded-2xl py-4 px-4">
          <Text className="text-white text-lg">Run</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#E94057] flex-1 rounded-2xl py-4 px-4">
          <Text className="text-white text-lg">Exercise</Text>
        </TouchableOpacity>
      </View> */}
      {/* <View
        style={{
          paddingVertical: moderateScale(12),
          backgroundColor: "#E94057",
          borderRadius: 15,
          alignSelf: "flex-start",
          marginTop: 20,
          paddingRight: moderateScale(40),
          paddingLeft: moderateScale(14),
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: moderateScale(14),
            fontWeight: "700",
          }}
        >
          Run
        </Text>
      </View> */}
    </SafeAreaView>
  );
}

/* container */

// position: absolute;
// width: 140px;
// height: 45px;
// left: 40px;
// top: 418px;

// /* red #E94057 */
// background: #E94057;
// /* red x0 y15 b15 o20 */
// box-shadow: 0px 15px 15px rgba(233, 64, 87, 0.2);
// border-radius: 15px;

// /* 7 */

// position: absolute;
// width: 140px;
// height: 45px;
// left: 40px;
// top: 418px;

// /* container */

// position: absolute;
// width: 140px;
// height: 45px;
// left: 40px;
// top: 418px;

// /* red #E94057 */
// background: #E94057;
// /* red x0 y15 b15 o20 */
// box-shadow: 0px 15px 15px rgba(233, 64, 87, 0.2);
// border-radius: 15px;

// /* sport */

// position: absolute;
// width: 19px;
// height: 19px;
// left: 54px;
// top: 431px;

// /* Vector (Stroke) */

// position: absolute;
// left: 4.17%;
// right: 4.17%;
// top: 6.25%;
// bottom: 4.17%;

// /* White #FFFFFF */
// background: #FFFFFF;

/* Run */

// position: absolute;
// width: 83px;
// height: 21px;
// left: 81px;
// top: 430px;

// /* H6 / 14 Bold */
// font-family: 'Sk-Modernist';
// font-style: normal;
// font-weight: 700;
// font-size: 14px;
// line-height: 150%;
// /* identical to box height, or 21px */

// /* White #FFFFFF */
// color: #FFFFFF;
