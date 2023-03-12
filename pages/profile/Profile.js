import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import BottomBar from "../../component/BottomBar";
import img from "../../assets/img/splash.png";
import MyButton from "../../component/MyButton";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectTakenPhotos,
  selectUser,
} from "../../redux/features/userSlice";
import WarningModal from "../../component/WarningModal";

export default function Profile({ navigation }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const takenPhotos = useSelector(selectTakenPhotos);

  const [isLogout, setIsLogout] = useState(false);

  const onLogout = () => {
    takenPhotos.length > 0
      ? alert("Please Submit all your taken photos before login out.")
      : dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLogout && (
        <WarningModal
          title="Wanna Leave ?🥺 "
          onCancel={() => setIsLogout(false)}
          onProceed={() => onLogout()}
        />
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          <Image style={styles.image} source={img} />
          <Text style={{ fontWeight: "700", fontSize: 20 }}>{user.name}</Text>
          <Text style={{ color: "gray", marginVertical: 5 }}>{user.email}</Text>
          <Text style={{ color: "gray", marginBottom: 20 }}>
            Joined: {user.date_joined}
          </Text>
          <MyButton
            Icon={<EvilIcons name="pencil" size={24} color="white" />}
            text="Edit Profile"
            onPress={() => navigation.navigate("EditProfile")}
          />
        </View>
        <View>
          <Text style={{ fontWeight: "400", fontSize: 16 }}>
            Security Details
          </Text>
          <View
            style={{
              marginHorizontal: 20,
              borderBottomWidth: 2,
              borderBottomColor: "#444444",
              paddingBottom: 20,
            }}
          >
            <TouchableOpacity style={styles.options}>
              <Text>Privacy Policy</Text>
              <AntDesign name="right" size={24} color="#394160" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.options}>
              <Text>Terms and Condition</Text>
              <AntDesign name="right" size={24} color="#394160" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setIsLogout(true)}
            style={{ flexDirection: "row" }}
          >
            <MaterialIcons name="exit-to-app" size={24} color="#B61E2B" />
            <Text style={{ fontWeight: "400", fontSize: 16, color: "#B61E2B" }}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          alignItems: "center",
          width: widthPercentageToDP(100),
          marginHorizontal: -20,
          borderTopWidth: 1,
          borderTopColor: "#d3d3d3",
          paddingTop: 10,
        }}
      >
        <BottomBar Pactive={true} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  content: {
    justifyContent: "space-around",
    height: heightPercentageToDP(90),
  },
  header: {
    alignItems: "center",
    marginTop: heightPercentageToDP(8),
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: heightPercentageToDP(50),
    borderWidth: 4,
    borderColor: "#E49531",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
});
