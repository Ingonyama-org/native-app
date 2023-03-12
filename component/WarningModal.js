import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import MyButton from "./MyButton";

export default function WarningModal({ title, onProceed, onCancel }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title} </Text>
        <MyButton onPress={onProceed} text="Proceed" />
        <MyButton onPress={onCancel} text="Cancel" nobg={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1999,
    // width: widthPercentageToDP(100),
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    height: heightPercentageToDP(40),
    width: widthPercentageToDP(90),
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
});
