import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default function IdentifiedCard({ name, park, img, age }) {
  return (
    <TouchableOpacity style={styles.imageView}>
      <ImageBackground style={styles.image} source={img}>
        <View
          style={{
            justifyContent: "flex-end",
            height: "100%",
            padding: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 20,
              color: "#B4B4B4",
            }}
          >
            {name}
          </Text>
          <Text style={{ color: "white" }}>{park}</Text>
          <Text style={{ color: "#FFFFFF", fontSize: 12 }}>
            {age} years old
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageView: {
    marginTop: 20,
    overflow: "hidden",
    alignItems: "center",
    borderRadius: 20,
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(60),
    flex: 1,
  },
  image: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(60),
  },
});
