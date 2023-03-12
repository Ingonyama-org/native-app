import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import MyButton from "../../component/MyButton";
import MyInput from "../../component/MyInput";

export default function Verify({ navigation }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>Verify Account</Text>
        <Text style={styles.pageCount}>2/2</Text>
      </View>
      <Text>
        A verification code has been sent to your phone number at +254791XXX721.
        Please enter it here to verify your account
      </Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          height: heightPercentageToDP(70),
        }}
      >
        <MyInput placeholder="Enter the code" />

        <MyButton
          text="Verify account"
          onPress={() => navigation.navigate("Success")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    color: "#E49531",
  },
  pageCount: {
    color: "#E49531",
  },
  content: {
    height: heightPercentageToDP(70),
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
