import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import img from "../../../assets/img/onboarding/onboarding1.jpg";

export default function ReadStories() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: " 600" }}>
          Scar in the Tsavo!!!!
        </Text>
      </View>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={styles.image} source={img} />
          <Text>KWS</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: widthPercentageToDP(50),
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.date}>Jul 29, 2022</Text>
          <Text style={styles.date}>4 min. read</Text>
        </View>
      </View>
      <ScrollView style={styles.textBody}>
        <Text>
          Lorem ipsum dolor sit amet consectetur. Feugiat risus non ornare morbi
          semper rutrum sed quisque est. Rhoncus amet cras sed metus posuere
          auctor faucibus augue. Vestibulum urna velit tortor sagittis. Arcu
          diam dolor risus cursus bibendum. Lacus tortor amet ligula magna
          nullam. Tortor erat sagittis id sollicitudin vestibulum commodo orci.
          Nulla ultricies sagittis at tempus ac pulvinar nunc. Rutrum in in duis
          sagittis odio tellus ac. Nulla porttitor arcu elit et. Porttitor nisl
          tristique velit in cras suscipit nunc. Vel ante morbi mi est consequat
          sit lobortis pellentesque. Quisque nec mattis ut nam interdum diam. Ut
          eu donec in at mauris non. In libero pellentesque eleifend a turpis
          odio eget cursus est. Scelerisque duis lectus sed ut leo felis. Eget
          vitae eget at non odio pellentesque. Quis mauris sed pharetra et
          viverra quis in. Sapien nunc elit integer viverra quis nisi. Auctor
          faucibus odio eu ac. Lorem ipsum dolor sit amet consectetur. Feugiat
          risus non ornare morbi semper rutrum sed quisque est. Rhoncus amet
          cras sed metus posuere auctor faucibus augue. Vestibulum urna velit
          tortor sagittis. Arcu diam dolor risus cursus bibendum. Lacus tortor
          amet ligula magna nullam. Tortor erat sagittis id sollicitudin sit
          lobortis pellentesque. Quisque nec mattis ut nam interdum diam. Ut eu
          donec in at mauris non. In libero pellentesque eleifend a turpis odio
          eget cursus est. Scelerisque duis lectus sed ut leo felis. Eget vitae
          eget at non odio pellentesque. Quis mauris sed pharetra et viverra
          quis in. Sapien nunc elit integer viverra quis nisi. Auctor faucibus
          odio eu ac. Lorem ipsum dolor sit amet consectetur. Feugiat risus non
          ornare morbi semper rutrum sed quisque est. Rhoncus amet cras sed
          metus posuere auctor faucibus augue. Vestibulum urna velit tortor
          sagittis. Arcu diam dolor risus cursus bibendum. Lacus tortor amet
          ligula magna nullam. Tortor erat sagittis id sollicitudin
        </Text>
        <Text style={{ fontWeight: "600", fontSize: 20, textAlign: "center" }}>
          Thank You for Reading
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    flex: 1,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
  },
  textBody: {
    marginTop: 20,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: widthPercentageToDP(50),
    marginRight: 20,
  },
  date: {
    fontStyle: "italic",
    fontSize: 12,
    fontWeight: "500",
    color: "#a3a3a3",
  },
});
