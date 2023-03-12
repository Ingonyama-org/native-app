import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";

import MyButton from "../../component/MyButton";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTakenPhoto,
  selectUser,
  submittedPhoto,
} from "../../redux/features/userSlice";
import { flaskViewInstance, nodeInstance } from "../../routes";

export default function SubmitImage({ route, navigation }) {
  const { img, time, date, actual_location, location } = route.params;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [isUploading, setIsUploading] = useState(false);

  const handleUploadImg = async () => {
    setIsUploading(true);
    let localUri = img;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();

    // "uploadPhoto" is the name of the form field the server expects
    formData.append("uploadPhoto", { uri: localUri, name: filename, type });

    await nodeInstance
      .post(`/upload`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const img_detail_data = {
          email: user.email,
          img_id: res.data.message.img_id,
          img_filename: res.data.message.img_filename,
          time: time,
          date: date,
          actual_location: actual_location,
        };

        flaskViewInstance.post("/upload/img_detail", img_detail_data, {
          headers: {
            "content-type": "application/json",
          },
        });

        dispatch(
          submittedPhoto({
            img: img,
            imgFullUrl: res.data.message.imgFullUrl,
            time: time,
            date: date,
            location: location,
            imgUploadStatus: true,
          })
        );
      })
      .then(() => {
        dispatch(removeTakenPhoto(img));
        navigation.navigate("Gallery");
        setIsUploading(false);
      })
      .catch(() => setIsUploading(false));
    setIsUploading(false);
  };

  // useEffect(() => {
  //   (async () => {
  //     const res = await nodeInstance.get("/files");
  //     console.log(res.data);
  //   })();
  // }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{ uri: img }}
      ></ImageBackground>
      <MyButton
        Icon={
          <Feather
            name="upload"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
        }
        text={isUploading ? "Uploading..." : "Submit Image"}
        onPress={() => handleUploadImg()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d1c3a1",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(60),
  },
});
