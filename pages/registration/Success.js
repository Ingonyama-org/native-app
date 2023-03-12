import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import successimg from "../../assets/img/success.png";
import MyButton from "../../component/MyButton";
import { login } from "../../redux/features/userSlice";
import { flaskAuthInstance } from "../../routes";
import { useDispatch } from "react-redux";

export default function Success({}) {
  const dispatch = useDispatch();
  const onPressDoneBtn = async () => {
    await flaskAuthInstance.get(`/signup`).then((res) => {
      dispatch(
        login({
          name: res.data.name,
          email: res.data.email,
          date_joined: res.data.date_joined,
          phone_number: res.data.phone_number,
        })
      );
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Verified</Text>
      <View style={styles.content}>
        <ImageBackground
          style={styles.image}
          source={successimg}
        ></ImageBackground>
        <View style={{ flex: 0.3, alignItems: "center" }}>
          <Text style={styles.title}>Congratulations!!</Text>
          <Text style={{ textAlign: "center" }}>
            Your account has been verified and you are on your way to start
            roaring for action
          </Text>
          <View style={{ paddingTop: 20 }}>
            <MyButton text="Let's Go!!" onPress={() => onPressDoneBtn()} />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
    height: heightPercentageToDP(70),
  },
  title: {
    color: "#E49531",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
  },

  image: {
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(40),
  },
});
