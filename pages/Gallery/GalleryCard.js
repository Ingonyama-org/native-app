import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

export default function GalleryCard({
  img,
  time,
  date,
  actual_location,
  location,
  imgUploadStatus,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        styles.imageView,
        imgUploadStatus
          ? {
              borderBottomColor: "rgba(0, 255, 0, 0.5)",
              borderRightColor: "rgba(0, 255, 0, 0.5)",
            }
          : {
              borderBottomColor: "rgba(255, 0, 0, 0.5)",
              borderRightColor: "rgba(255, 0, 0, 0.5)",
            },
      ]}
      onPress={() =>
        navigation.navigate("ViewImage", {
          imgUrl: img,
          time: time,
          date: date,
          actual_location: actual_location,
          location: location,
          imgUploadStatus: imgUploadStatus,
        })
      }
    >
      <ImageBackground style={styles.image} source={{ uri: img }}>
        {!imgUploadStatus && <Text style={styles.text}>Submit Image</Text>}
      </ImageBackground>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  imageView: {
    borderRadius: 10,
    overflow: "hidden",
    margin: 5,
    borderBottomWidth: 4,
    borderRightWidth: 1,
  },
  image: {
    width: widthPercentageToDP(46),
    height: heightPercentageToDP(18),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "gray",
    fontSize: 20,
  },
});
