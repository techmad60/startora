import { Text } from "@/components/Text";
import { View } from "react-native";

export default function ProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text weight="Bold" className="text-2xl text-center">
        Your Profile
      </Text>
      <Text className="text-gray-600 text-center mt-4 px-6">
        Manage your account settings and preferences.
      </Text>
    </View>
  );
}