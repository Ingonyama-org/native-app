import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import BottomBar from "../../component/BottomBar";
import navigationimg from "../../assets/img/notification.png";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default function Notifications() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={navigationimg}
      ></ImageBackground>
      <View style={styles.content}>
        <Text style={styles.title}>No new Notifications</Text>
        <Text>All your Notifications will appear here.</Text>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          paddingTop: 10,
          borderTopColor: "#f3f3f3",
          borderTopWidth: 1,
        }}
      >
        <BottomBar active={true} Nactive={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: widthPercentageToDP(60),
    height: heightPercentageToDP(35),
  },
  content: {
    marginTop: heightPercentageToDP(5),
    alignItems: "center",
  },
  title: {
    color: "#E49531",
    fontWeight: "600",
    fontSize: 20,
    marginBottom: heightPercentageToDP(5),
  },
});
