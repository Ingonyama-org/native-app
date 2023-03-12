import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import DoubleClick from "react-native-double-tap";
import img from "../../assets/img/feed1.png";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default function FeedsCard() {
  const [like, setLike] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <Image style={styles.profileimg} source={img} />
            <View>
              <Text style={{ fontSize: 12, fontWeight: "400" }}>
                David Omeno
              </Text>
              <Text style={{ fontSize: 10, fontWeight: "100", color: "gray" }}>
                Tsavo National Park
              </Text>
            </View>
          </View>
          <View style={styles.leftHeader}>
            <TouchableOpacity>
              <FontAwesome name="share-alt" size={24} color="#595151" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 20 }}>
              <Feather name="more-vertical" size={24} color="#595151" />
            </TouchableOpacity>
          </View>
        </View>
        <DoubleClick
          //   singleTap={() => {
          //     navigation.navigate("Moreinfo", {
          //       image: img,
          //       name: name,
          //       location: location,
          //       text: text,
          //       author: author,
          //     });
          //   }}
          doubleTap={() => setLike(true)}
        >
          <ImageBackground
            source={img}
            resizeMode="cover"
            style={styles.bgimage}
          ></ImageBackground>
        </DoubleClick>
        <View style={styles.likeView}>
          {!like ? (
            <TouchableOpacity onPress={() => setLike((current) => !current)}>
              <Ionicons name="heart" size={24} color={"red"} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setLike((current) => !current)}>
              <EvilIcons name="heart" size={30} color="black" />
            </TouchableOpacity>
          )}
          <Text>559 Likes</Text>
        </View>
      </View>

      <View style={styles.description}>
        <Text>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce
          tellus. Cum sociis natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Aenean placerat...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    overflow: "hidden",
    marginBottom: 20,
    borderBottomWidth: 0,
    padding: 10,
  },
  topContent: {
    width: widthPercentageToDP(90),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileimg: {
    width: 60,
    height: 60,
    borderRadius: heightPercentageToDP(50),
    marginRight: 10,
  },
  likeView: {
    paddingHorizontal: 10,
  },
  description: {
    paddingHorizontal: 10,
    width: widthPercentageToDP(90),
  },
  bgimage: {
    alignItems: "center",
    height: heightPercentageToDP(50),
    width: widthPercentageToDP(90),
  },
});
