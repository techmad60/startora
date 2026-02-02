import { Text } from "@/components/Text";
import React from "react";
import { View } from "react-native";

export default function Splash() {
  return (
    <View className="flex-1 bg-primary items-center justify-center">
      <Text weight="SemiBold" className="text-secondary text-[2.5rem]">
        Startora
      </Text>
    </View>
  );
}
