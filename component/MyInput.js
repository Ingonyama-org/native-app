import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default function MyInput({
  label,
  placeholder,
  isPassword,
  valueInput,
  onChangeText,
  editable,
  selectTextOnFocus,
  icon,
  onPress,
  color,
  emailError,
}) {
  return (
    <View style={styles.content}>
      <Text style={{ color: color }}>{label}</Text>

      <View
        style={[
          styles.textinput,
          { borderColor: !emailError ? "#8F9098" : "red" },
        ]}
      >
        <TextInput
          placeholder={placeholder}
          secureTextEntry={isPassword}
          value={valueInput}
          onChangeText={onChangeText}
          editable={editable}
          selectTextOnFocus={selectTextOnFocus}
          style={{
            color: color,
            width: "100%",
            // height: "100%",
          }}
        />
        <TouchableOpacity onPress={onPress} style={{ marginLeft: -10 }}>
          {icon}
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    marginBottom: 10,
  },
  textinput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    borderColor: "#ACB8D2",
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(7),
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
