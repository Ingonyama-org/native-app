import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function BottomBar({
  Hactive,
  Factive,
  Mactive,
  Nactive,
  Uactive,
  Pactive,
  HomeCameraActive,
}) {
  const navigation = useNavigation();
  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (result.assets[0].type != "image") {
      alert("Oops, only upload images");
    } else if (!result.canceled) {
      dispatch(takePhoto({ img: result.assets[0].uri }));
    }
  };

  return (
    <View style={styles.btns}>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("Home")}
      >
        <AntDesign
          name="home"
          size={24}
          color={Hactive ? "#E49531" : HomeCameraActive ? "#fff" : "#D1C3A1"}
        />
        <Text
          style={{
            color: Hactive ? "#E49531" : HomeCameraActive ? "#fff" : "#D1C3A1",
          }}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("Feeds")}
      >
        <Ionicons
          name="library-outline"
          size={24}
          color={Factive ? "#E49531" : HomeCameraActive ? "#fff" : "#D1C3A1"}
        />
        <Text
          style={{
            color: Factive ? "#E49531" : HomeCameraActive ? "#fff" : "#D1C3A1",
          }}
        >
          Feeds
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("Notifications")}
      >
        <Entypo
          name="bell"
          size={24}
          color={Nactive ? "#E49531" : HomeCameraActive ? "#fff" : "#D1C3A1"}
        />
        <Text
          style={{
            color: Nactive ? "#E49531" : HomeCameraActive ? "#fff" : "#D1C3A1",
          }}
        >
          Notifications
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Map")}
        style={{ alignItems: "center" }}
      >
        <FontAwesome
          name="map-marker"
          size={24}
          color={Mactive ? "#E49531" : HomeCameraActive ? "#fff" : "#D1C3A1"}
        />
        <Text
          style={{
            color: Mactive ? "#E49531" : HomeCameraActive ? "#fff" : "#D1C3A1",
          }}
        >
          Maps
        </Text>
      </TouchableOpacity>
      {/* {HomeCameraActive ? (
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={async () => await pickMedia()}
        >
          <MaterialCommunityIcons
            name="file-upload"
            size={24}
            color={Uactive ? "#E49531" : HomeCameraActive ? "#fff" : "#D1C3A1"}
          />
          <Text
            style={{
              color: Uactive
                ? "#E49531"
                : HomeCameraActive
                ? "#fff"
                : "#D1C3A1",
            }}
          >
            Upload
          </Text>
        </TouchableOpacity>
      ) : ( */}
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons
          name="person-circle-outline"
          size={24}
          color={Pactive ? "#E49531" : HomeCameraActive ? "#fff" : "#D1C3A1"}
        />
        <Text
          style={{
            color: Pactive ? "#E49531" : HomeCameraActive ? "#fff" : "#D1C3A1",
          }}
        >
          Profile
        </Text>
      </TouchableOpacity>
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  btns: {
    flexDirection: "row",
    width: widthPercentageToDP(96),
    justifyContent: "space-between",
    alignItems: "center",
  },
});
