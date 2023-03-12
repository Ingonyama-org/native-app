import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import BottomBar from "../../component/BottomBar";
import AllFeeds from "./AllFeeds";
import Identified from "./identified/Identified";
import Stories from "./stories/Stories";

export default function Feeds() {
  const [isFeedActive, setIsFeedActive] = useState(true);
  const [isSimbaStoriesActive, setIsSimbaStoriesActive] = useState(false);
  const [isIDLionsActive, setIsIDLionsActive] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.tabHeader}>
        <TouchableOpacity
          onPress={() => {
            setIsFeedActive(true);
            setIsSimbaStoriesActive(false);
            setIsIDLionsActive(false);
          }}
          style={isFeedActive && [styles.tabOptions]}
        >
          <Text style={{ color: "#fff", paddingBottom: 5 }}>FEEDS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsFeedActive(false);
            setIsSimbaStoriesActive(true);
            setIsIDLionsActive(false);
          }}
          style={isSimbaStoriesActive && styles.tabOptions}
        >
          <Text style={{ color: "#fff", paddingBottom: 5 }}>Simba Stories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsFeedActive(false);
            setIsSimbaStoriesActive(false);
            setIsIDLionsActive(true);
          }}
          style={isIDLionsActive && styles.tabOptions}
        >
          <Text style={{ color: "#fff", paddingBottom: 5 }}>
            Identified Lions
          </Text>
        </TouchableOpacity>
      </View>
      {isFeedActive && (
        <View style={{ height: heightPercentageToDP(70) }}>
          <AllFeeds />
        </View>
      )}
      {isSimbaStoriesActive && (
        <View>
          <Stories />
        </View>
      )}
      {isIDLionsActive && (
        <View style={{ flex: 1 }}>
          <Identified />
        </View>
      )}
      <View style={styles.bottomBar}>
        <BottomBar Factive={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#e5bc5e",
  },
  tabOptions: {
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#E49531",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: widthPercentageToDP(100),
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#d3d3d3",
    backgroundColor: "#fff",
  },
});
