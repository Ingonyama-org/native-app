import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Share,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import WarningModal from "../../component/WarningModal";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSubmittedPhoto,
  removeTakenPhoto,
  selectSubmittedPhotos,
} from "../../redux/features/userSlice";

export default function ViewImage({ route, navigation }) {
  const { imgUrl, time, date, actual_location, location, imgUploadStatus } =
    route.params;
  const dispatch = useDispatch();
  const submittedPhoto = useSelector(selectSubmittedPhotos);

  const [isDelete, setIsDelete] = useState(false);
  const [imgFullUrl, setImgFullUrl] = useState(null);

  useEffect(() => {
    submittedPhoto.map(({ img, imgFullUrl }) => {
      imgUrl === img && setImgFullUrl(imgFullUrl);
    });
  }, [onShare]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: imgFullUrl,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          resizeMode="contain"
          source={{ uri: imgUrl }}
        ></ImageBackground>
        {isDelete ? (
          <WarningModal
            title="Delete Parmanently ?"
            onCancel={() => setIsDelete(false)}
            onProceed={() => {
              imgUploadStatus
                ? dispatch(removeSubmittedPhoto(imgUrl))
                : dispatch(removeTakenPhoto(imgUrl));
              setIsDelete(false);
              navigation.navigate("Gallery");
            }}
          />
        ) : (
          <>
            <View style={styles.options}>
              <TouchableOpacity style={styles.optionsBtn}>
                <Ionicons
                  onPress={() => setIsDelete(true)}
                  name="trash-bin-sharp"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>

              {imgUploadStatus && (
                <TouchableOpacity
                  onPress={() => onShare()}
                  style={styles.optionsBtn}
                >
                  <EvilIcons name="share-google" size={24} color="black" />
                </TouchableOpacity>
              )}

              {!imgUploadStatus && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SubmitImage", {
                      img: imgUrl,
                      time: time,
                      date: date,
                      actual_location: actual_location,
                      location: location,
                    })
                  }
                  style={styles.optionsBtn}
                >
                  <Feather name="upload" size={24} color="black" />
                </TouchableOpacity>
              )}
              {/* <TouchableOpacity style={styles.optionsBtn}>
                <Feather name="more-vertical" size={24} color="black" />
              </TouchableOpacity> */}
            </View>
          </>
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d1c3a1",
  },
  image: {
    flex: 0.8,
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(75),
  },
  options: {
    height: heightPercentageToDP(10),
    flexDirection: "row",
    justifyContent: "space-around",
    width: widthPercentageToDP(100),
    alignItems: "center",
    position: "relative",
    bottom: heightPercentageToDP(-14),
    zIndex: 2,
  },
  optionsBtn: {
    borderRadius: widthPercentageToDP(50),
    padding: 10,
    borderWidth: 3,
    borderColor: "rgba(0,0,0,0.05)",
  },
});
