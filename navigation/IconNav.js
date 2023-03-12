import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

export function NotificationsIcon() {
  const navigation = useNavigation();
  return (
    <Ionicons
      name="notifications-outline"
      size={24}
      color="#002145"
      onPress={() => navigation.navigate("Notifications")}
    />
  );
}

export function ProfileIcon() {
  const navigation = useNavigation();
  return (
    <Ionicons
      name="person"
      size={24}
      color="black"
      onPress={() => navigation.navigate("Profile")}
    />
  );
}

const styles = StyleSheet.create({
  profileImg: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#f3f3f3",
  },
});
