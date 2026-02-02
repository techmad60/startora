import { Text } from "@/components/Text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

interface User {
  first_name: string;
  last_name: string;
  phone_number: string;
}

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Get the auth token from storage
      const token = await AsyncStorage.getItem("authToken");
      console.log("AUTH TOKEN:", token);

      if (!token) {
        router.replace("/(auth)/login");
        setError("Authentication required. Please login again.");
        return;
      }

      const response = await fetch(
        "https://stratora-backend.pxxl.click/api/v1/users/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else if (response.status === 401) {
        setError("Session expired. Please login again.");
        // Optionally clear the token
        await AsyncStorage.removeItem("authToken");
      } else {
        setError("Failed to fetch user data");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-600">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text weight="Bold" className="text-xl text-red-500 mb-4">
          Error
        </Text>
        <Text className="text-gray-600 text-center px-6">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text weight="Bold" className="text-3xl text-center mb-4">
        Welcome back, {user?.first_name}!
      </Text>
      <Text className="text-gray-600 text-center text-lg">
        Ready to continue your business registration journey?
      </Text>
      <Text className="text-gray-500 text-center mt-4">
        Phone: {user?.phone_number}
      </Text>
    </View>
  );
}
