import { StyleSheet, View } from "react-native";
import NavigationUtility from "./navigation";

export default function Main() {
  return (
    <View style={styles.container}>
      <NavigationUtility />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
