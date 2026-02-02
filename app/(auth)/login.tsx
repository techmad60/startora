import { Text } from "@/components/Text";
import { TextInput as CustomTextInput } from "@/components/TextInput";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const router = useRouter();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const snapPoints = ["60%", "70%"];

  // Single useEffect to present the modal
  useEffect(() => {
    const timer = setTimeout(() => {
      bottomSheetModalRef.current?.present();
    }, 300); // Increased delay slightly
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    if (!phoneNumber || !password) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fill in all fields",
      });
      return;
    }

    try {
      const response = await fetch(
        "https://stratora-backend.pxxl.click/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: phoneNumber,
            password: password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        // Store the auth token
        if (data.access_token) {
          await AsyncStorage.setItem("authToken", data.access_token);
        }
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: "Welcome back!",
        });
        // Navigate after a short delay to let the toast show
        setTimeout(() => {
          router.replace("/(tabs)");
        }, 1500);
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: data.message || "Please check your credentials.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: "Please check your connection and try again.",
      });
    }
  };

  return (
    <>
      <View className="flex-1 bg-black relative" />
      <Text
        weight="SemiBold"
        className="text-white absolute inset-0 top-48 text-center text-[1.5rem]"
      >
        Login To Your Account
      </Text>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableDynamicSizing={false}
        index={0}
        backgroundStyle={{ backgroundColor: "white" }}
        handleIndicatorStyle={{ backgroundColor: "#ccc" }}
      >
        <View className="flex-1 p-6">
          <CustomTextInput
            className="bg-gray-300 text-black rounded-full p-3 pl-5 mb-4"
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <View className="relative mb-6">
            <CustomTextInput
              className="bg-gray-300 text-black rounded-full p-3 pl-5 pr-12"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-primary py-3 rounded-md items-center"
            onPress={handleSubmit}
          >
            <Text weight="Medium" className="text-secondary text-lg">
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text className="text-gray-500 text-xs mt-32 text-center">
              Don&apos;t have an Account?
              <Text className="text-black"> Sign Up Here.</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </>
  );
}
