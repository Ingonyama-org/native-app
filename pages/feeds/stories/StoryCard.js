import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import MyButton from "../../../component/MyButton";
import img from "../../../assets/img/profile.png";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function StoryCard() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scar in the Tsavo!!!!</Text>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={styles.image} source={img} />
          <Text style={styles.subject}>KWS</Text>
        </View>
        <View
          style={{
            width: widthPercentageToDP(40),
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={styles.date}>JUl 28th, 2023</Text>
          <Text style={styles.date}>4min Read</Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "300", fontSize: 12 }}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce
          tellus. Cum sociis natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Aenean placerat. Lorem ipsum dolor sit amet,
          consectetuer adipiscing elit. Fusce tellus. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Aenean placerat...
        </Text>
      </View>
      <View
        style={{ marginTop: heightPercentageToDP(5), alignItems: "center" }}
      >
        <MyButton
          text="Read More"
          onPress={() => navigation.navigate("ReadStories")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    padding: 10,
    borderRadius: 8,
    marginTop: 30,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: widthPercentageToDP(50),
  },
  subject: {
    fontWeight: "900",
    fontSize: 10,
    marginLeft: 10,
  },
  date: {
    fontStyle: "italic",
    fontSize: 10,
    fontWeight: "500",
    color: "#C8C8C8",
  },
});
