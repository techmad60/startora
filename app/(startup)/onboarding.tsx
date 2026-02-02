import { Text } from "@/components/Text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");
const slides = [
  {
    src: require("../../assets/images/onboarding-1.jpg"),
    title: "Start your business the right way.",
    description:
      "Register your business without stress, confusion, or unnecessary delays.",
  },
  {
    src: require("../../assets/images/onboarding-2.jpg"),
    title: "Make your business officially registered.",
    description:
      "Make your business officially registered and ready for growth.",
  },
  {
    src: require("../../assets/images/onboarding-3.jpg"),
    title: "From idea to registered business",
    description:
      "Track your progress, submit documents, and get updates, all in one app.",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);
  const intervalRef = useRef<number | null>(null);

  function onMomentumScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const x = e.nativeEvent.contentOffset.x;
    const i = Math.round(x / width);
    setIndex(i);
  }

  const handleOnboardingComplete = async () => {
    try {
      // Mark onboarding as completed
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
      // Navigate to login
      router.replace("/(auth)/signup");
    } catch (error) {
      // If storage fails, still navigate to login
      router.replace("/(auth)/signup");
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex < slides.length - 1) {
          const nextIndex = prevIndex + 1;
          scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
          return nextIndex;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prevIndex;
        }
      });
    }, 3000); // Auto-slide every 3 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {slides.map((slide, i) => (
          <View key={i} style={{ width, height }}>
            <Image
              source={slide.src}
              style={{ width, height, resizeMode: "cover" }}
            />

            {/* Full-screen translucent overlay */}
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.35)",
              }}
            />

            <View className="absolute bottom-48 left-0 right-0 px-6">
              <Text weight="Medium" className="text-[1.5rem] text-white">
                {slide.title}
              </Text>
              <Text className="text-white mt-2">{slide.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="absolute bottom-28 inset-x-0 mx-8 items-center">
        <View className="flex-row gap-2 mb-6">
          {slides.map((_, i) => (
            <View
              key={i}
              className={`w-3 h-3 rounded-full ${i === index ? "bg-primary" : "bg-white"}`}
            />
          ))}
        </View>

        {index === slides.length - 1 ? (
          <TouchableOpacity
            className="bg-primary py-3 rounded-md w-full items-center"
            onPress={handleOnboardingComplete}
          >
            <Text weight="Medium" className="text-secondary text-lg">
              SignUp
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="py-3 self-start"
            onPress={() => {
              const next = Math.min(index + 1, slides.length - 1);
              scrollRef.current?.scrollTo({ x: next * width, animated: true });
            }}
          >
            <Text weight="SemiBold" className="text-white">
              Skip
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
