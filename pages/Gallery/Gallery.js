import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
  Text,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import onboardimg1 from "../../assets/img/onboarding/onboarding1.jpg";
import onboardimg2 from "../../assets/img/onboarding/onboarding2.jpeg";
import onboardimg3 from "../../assets/img/onboarding/onboarding3.jpg";
import MyButton from "../../component/MyButton";
import {
  selectTakenPhotos,
  selectSubmittedPhotos,
  takePhoto,
} from "../../redux/features/userSlice";
import GalleryCard from "./GalleryCard";
import * as ImagePicker from "expo-image-picker";

export default function Gallery({ navigation }) {
  const dispatch = useDispatch();
  const takenPhotos = useSelector(selectTakenPhotos);
  const submittedPhotos = useSelector(selectSubmittedPhotos);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isImageItem, setImageItem] = useState(null);

  const allPhotos = takenPhotos.concat(submittedPhotos);

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

  // console.log(takenPhotos);
  useEffect(() => {
    if (takenPhotos.length < 1) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [takenPhotos, isImageItem]);
  let numColumns = 2;
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          position: "relative",
          top: 0,
          backgroundColor: "#d1c3a1",
        }}
      >
        <MyButton
          nobg={true}
          text="Upload Photo"
          onPress={async () => await pickMedia()}
        />
      </View>
      <FlatList
        data={allPhotos}
        numColumns={numColumns}
        renderItem={({ item }) => {
          return (
            <GalleryCard
              img={item.img}
              time={item.time}
              date={item.date}
              actual_location={item.actualLocation}
              location={item.location}
              imgUploadStatus={item.imgUploadStatus}
            />
          );
        }}
        keyExtractor={(item) => item.img}
        ListFooterComponent={() => (
          <Text
            style={{
              textAlign: "center",
              marginBottom: 20,
              fontWeight: "bold",
              color: "gray",
            }}
          >
            &#169;Igonyama
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d1c3a1",
  },
  content: {
    flexWrap: "wrap",
    flexDirection: "row",
    // // justifyContent: "center",
    backgroundColor: "#d1c3a1",
    flex: 1,
  },
  imageView: {
    borderRadius: 10,
    overflow: "hidden",
    margin: 5,
    borderBottomColor: "rgba(0, 0, 0, 0.25)",
    borderBottomWidth: 4,
    borderRightColor: "rgba(0, 0, 0, 0.25)",
    borderRightWidth: 1,
  },
  image: {
    width: widthPercentageToDP(46),
    height: heightPercentageToDP(18),
  },
});
