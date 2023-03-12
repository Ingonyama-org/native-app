import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import img from "../../../assets/img/splash.png";
import img2 from "../../../assets/img/onboarding/onboarding1.jpg";
import img3 from "../../../assets/img/onboarding/onboarding2.jpeg";
import img4 from "../../../assets/img/onboarding/onboarding3.jpg";
import img5 from "../../../assets/img/onboarding/onboarding1.jpg";

import IdentifiedCard from "./IdentifiedCard";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { selectTakenPhotos } from "../../../redux/features/userSlice";

export default function Identified() {
  const dispatch = useDispatch();
  const takenPhotos = useSelector(selectTakenPhotos);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (takenPhotos.length < 1) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [takenPhotos, isImageItem]);

  const [isOnDelete, setIsOnDelete] = useState(false);
  const [isOnClear, setIsOnClear] = useState(false);

  const [isImageItem, setImageItem] = useState(null);
  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: heightPercentageToDP(13) }}>
        <IdentifiedCard
          img={img}
          name="Scar"
          age="5"
          park="Meru National Park"
        />
        <IdentifiedCard
          img={img2}
          name="Ole"
          age="9"
          park="Nairobi National Park"
        />
        <IdentifiedCard img={img3} name="Simba" age="3" park="Masaai Mara" />
        <IdentifiedCard img={img4} name="Leo" age="8" park="Amboseli" />
        <IdentifiedCard img={img5} name="Scubby" age="5" park="Mount Kenya" />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
