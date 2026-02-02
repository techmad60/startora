import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import Splash from "./(startup)/splash";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      // Check if user has completed onboarding
      const hasCompletedOnboarding = await AsyncStorage.getItem(
        "hasCompletedOnboarding",
      );

      if (!hasCompletedOnboarding) {
        // First time user - show onboarding after splash
        const timer = setTimeout(() => {
          router.replace("/(startup)/onboarding");
        }, 1200);
        return () => clearTimeout(timer);
      } else {
        // User has completed onboarding - check authentication
        const authToken = await AsyncStorage.getItem("authToken");

        if (authToken) {
          // User is authenticated - go to main app
          const timer = setTimeout(() => {
            router.replace("/(tabs)");
          }, 1200);
          return () => clearTimeout(timer);
        } else {
          // User not authenticated - go to login
          const timer = setTimeout(() => {
            router.replace("/(auth)/login");
          }, 1200);
          return () => clearTimeout(timer);
        }
      }
    } catch (error) {
      // On error, default to onboarding
      const timer = setTimeout(() => {
        router.replace("/(startup)/onboarding");
      }, 1200);
      return () => clearTimeout(timer);
    }
  };

  return <Splash />;
}
