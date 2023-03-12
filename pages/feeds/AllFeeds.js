import React from "react";
import { View, Text, ScrollView } from "react-native";
import FeedsCard from "./FeedsCard";

export default function AllFeeds() {
  return (
    <ScrollView style={{ marginTop: 20, marginHorizontal: 5 }}>
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
    </ScrollView>
  );
}
