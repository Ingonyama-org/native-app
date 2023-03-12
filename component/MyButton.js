import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function MyButton({ text, onPress, nobg, Icon }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: nobg ? "transparent" : "#E49531",
          borderColor: nobg && "#E49531",
          borderWidth: nobg && 1,
        },
      ]}
    >
      {Icon && Icon}

      <Text style={[styles.text, { color: nobg ? "#444444" : "white" }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 279.18,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontSize: 15,
  },
});
