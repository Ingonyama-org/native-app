import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { widthPercentageToDP } from "react-native-responsive-screen";
import BottomBar from "../../component/BottomBar";
import { flaskViewInstance } from "../../routes";

export default function Map() {
  // const [initialRegion, setInitialRegion] = useState([
  //   { latitude: -1.4, longitude: 36.9 }, //nairobi national park
  //   { Latitude: -1.502, Longitude: 35.1365 }, // Maasai Mara National Reserve:
  //   { Latitude: -2.6457, Longitude: 37.2576 }, //Amboseli National Park
  //   { Latitude: -2.9956, Longitude: 38.5065 }, //Tsavo East National Park:
  //   { Latitude: -3.4979, Longitude: 38.3772 }, //Tsavo West National Park
  //   { Latitude: -0.3031, Longitude: 36.08 }, //Lake Nakuru National Park
  //   { Latitude: 0.5725, Longitude: 37.5547 }, //Samburu National Reserve
  //   { Latitude: -0.5557, Longitude: 36.6763 }, //Aberdare National Park
  //   { Latitude: -0.1528, Longitude: 37.3035 }, //Mount Kenya National Park
  //   { Latitude: -0.8924, Longitude: 36.3221 }, //Hell's Gate National Park
  // ]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetchLionHotspots();
  }, []);

  const fetchLionHotspots = async () => {
    try {
      const response = await flaskViewInstance.get("/map/lion_hotspots");
      const coordinates = response.data;

      setMarkers(coordinates);
      console.log(coordinates);
    } catch (error) {
      console.log("Error fetching lion hotspots:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -1.4,
          longitude: 36.9,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        mapType="satellite"
      >
        {/* Render the markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
          />
        ))}
      </MapView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "#fff",
          width: widthPercentageToDP(100),
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <BottomBar Mactive={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

// Android-MAP-API ssh -> AIzaSyCgE3b9bZQnCr4WrqceU9s39FchKs3o-kk
