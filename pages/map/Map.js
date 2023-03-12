import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { widthPercentageToDP } from "react-native-responsive-screen";
import BottomBar from "../../component/BottomBar";
export default function Map() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "#fff",
          width: widthPercentageToDP(100),
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <BottomBar Mactive={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

// Android-MAP-API ssh -> AIzaSyCgE3b9bZQnCr4WrqceU9s39FchKs3o-kk
