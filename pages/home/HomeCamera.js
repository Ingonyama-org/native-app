import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/core";
import { takePhoto } from "../../redux/features/userSlice";
import Expo2DContext from "expo-2d-context";
import { GLView } from "expo";
import BottomBar from "../../component/BottomBar";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.052);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.15);

export default function HomeCamera({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  const [imgSource, setImgSource] = useState(null);
  const cameraRef = useRef();

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync(location.coords);
      const date = new Date().toDateString();
      const time = new Date().toTimeString();

      setImgSource(data.uri);

      const onGLContextCreate = (gl) => {
        ctx = new Expo2DContext(gl);
        const ctx = canvas.getContext("2d");
        const rgba = ctx.getImageData(0, 0, data.width, data.height).data;
        console.log(rgba);
      };

      dispatch(
        takePhoto({
          img: data.uri,
          time: time,
          date: date,
          location: `${address[0].country},${address[0].city},${
            address[0].district
          },${address[0].region.replace(" ", "")}`,
          actualLocation: [location, address],
          imgUploadStatus: false,
        })
      );

      setIsPreview(true);
    }
  };

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

  const stopVideoRecording = () => {
    if (cameraRef.current) {
      setIsPreview(false);
      setIsVideoRecording(false);
      cameraRef.current.stopRecording();
    }
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
    setVideoSource(null);
  };

  const renderCancelPreviewButton = () => (
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />
      <View
        style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}
      />
    </TouchableOpacity>
  );
  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <MaterialIcons name="flip-camera-android" size={34} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onPress={() => takePicture()}
        style={styles.capture}
      >
        <Entypo name="camera" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.topBtns}
        onPress={() => navigation.navigate("Gallery")}
      >
        <Entypo name="images" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
  if (hasPermission === null && hasMediaPermission === null) {
    return <View />;
  }
  if (hasPermission === false && hasMediaPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {isFocused && (
        <Camera
          ref={cameraRef}
          style={styles.container}
          type={cameraType}
          flashMode={Camera.Constants.FlashMode.off}
          onCameraReady={onCameraReady}
          onMountError={(error) => {
            console.log("cammera error", error);
          }}
        >
          <View style={styles.cam_whiskers}></View>
        </Camera>
      )}
      {isPreview && (
        <ImageBackground style={styles.img_preview} source={{ uri: imgSource }}>
          {isPreview && renderCancelPreviewButton()}
        </ImageBackground>
      )}

      <View style={styles.container}>
        <View style={styles.controls}>
          {!videoSource && !isPreview && renderCaptureControl()}
          <View style={styles.bottomBtns}>
            <BottomBar Hactive={true} HomeCameraActive={true} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    width: widthPercentageToDP(100),
  },
  closeButton: {
    position: "absolute",
    top: 0,
    left: 0,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    flexDirection: "row",
    bottom: heightPercentageToDP(5),
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "#E49531",
    borderColor: "#FFED90",
    borderWidth: 18,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
    alignItems: "center",
    justifyContent: "center",
  },
  cam_whiskers: {
    height: heightPercentageToDP(83),
    width: widthPercentageToDP(90),
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 30,
    position: "absolute",
    top: heightPercentageToDP(5),
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
  controls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: widthPercentageToDP(100),
    alignItems: "center",
    justifyContent: "center",
  },
  topBottomBtns: {},
  bottomBtns: {
    backgroundColor: "rgba(0, 0, 0, 0.427)",
    height: heightPercentageToDP(10),
    width: widthPercentageToDP(100),
    alignItems: "center",
    justifyContent: "center",
  },

  img_preview: {
    position: "absolute",
    bottom: heightPercentageToDP(10),
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(25),
  },
});
