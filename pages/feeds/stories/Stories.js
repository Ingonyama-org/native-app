import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import StoryCard from "./StoryCard";

export default function Stories() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.textInputView}>
          <TextInput placeholder="Search" style={styles.textInput} />
          <TouchableOpacity style={{ margin: 5 }}>
            <Feather name="search" size={18} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#fafafa",
            width: 48.18,
            height: 42,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="filter" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      {/* STORY CARD */}
      <ScrollView style={{ height: heightPercentageToDP(60) }}>
        <StoryCard />
        <StoryCard />
        <StoryCard />

        <StoryCard />
        <StoryCard />
        <StoryCard />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  textInputView: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#f3f3f3",
    borderRadius: 10,
    width: widthPercentageToDP(70),
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    paddingHorizontal: 20,
    width: "90%",
  },
});
