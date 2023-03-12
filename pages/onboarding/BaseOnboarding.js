import React from "react";
import { ImageBackground, View, StyleSheet, Text } from "react-native";
import MyButton from "../../component/MyButton";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function BaseOnboarding({ btnText, onPress, desc, title, img }) {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={img}
      style={{
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: heightPercentageToDP(2),
          left: widthPercentageToDP(85),
          alignItems: "flex-end",
          marginRight: 30,
          marginTop: 40,
        }}
      >
        <Text
          onPress={() => navigation.navigate("Login")}
          style={{
            color: "#E49531",
            textDecorationLine: "underline",
            fontSize: 16,
          }}
        >
          Skip
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
        <MyButton text={btnText} onPress={() => navigation.navigate(onPress)} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: heightPercentageToDP(5),
    padding: 20,
    borderRadius: 10,
    height: heightPercentageToDP(35),
    justifyContent: "space-around",
    alignItems: "center",
    width: widthPercentageToDP(90),
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    color: "#000000",
  },
  desc: {
    textAlign: "center",
  },
});
