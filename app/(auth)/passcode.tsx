import { Text } from "@/components/Text";
import { TextInput as CustomTextInput } from "@/components/TextInput";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";

export default function PasscodeScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [passcode, setPasscode] = useState("");

  const snapPoints = ["60%", "70%"];

  // Single useEffect to present the modal
  useEffect(() => {
    const timer = setTimeout(() => {
      bottomSheetModalRef.current?.present();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handlePasscodeChange = (text: string) => {
    // Only allow digits and limit to 4 characters
    const filtered = text.replace(/[^0-9]/g, "").slice(0, 4);
    setPasscode(filtered);
  };

  const handleSubmit = () => {
    if (passcode.length === 4) {
      Alert.alert("Passcode", `Your passcode: ${passcode}`);
    } else {
      Alert.alert("Invalid", "Please enter a 4-digit passcode");
    }
  };

  return (
    <>
      <View className="flex-1 bg-black relative" />
      <Text
        weight="SemiBold"
        className="text-white absolute inset-0 top-48 text-center text-[1.5rem]"
      >
        Enter Your Passcode
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
          <Text weight="Medium" className="text-center mb-6">
            Please enter your 4-digit passcode to continue.
          </Text>
          <CustomTextInput
            className="bg-gray-300 text-black rounded-full p-3 text-center text-2xl tracking-widest mb-6"
            placeholder="0000"
            value={passcode}
            onChangeText={handlePasscodeChange}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
          />

          <TouchableOpacity
            className="bg-primary py-3 rounded-md items-center"
            onPress={handleSubmit}
          >
            <Text weight="Medium" className="text-secondary text-lg">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </>
  );
}
