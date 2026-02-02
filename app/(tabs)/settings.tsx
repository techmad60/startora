import { Text } from "@/components/Text";
import { View } from "react-native";

export default function SettingsScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text weight="Bold" className="text-2xl text-center">
        Settings
      </Text>
      <Text className="text-gray-600 text-center mt-4 px-6">
        Configure your app preferences and account options.
      </Text>
    </View>
  );
}