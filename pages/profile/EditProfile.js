import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/img/splash.png";
import BottomBar from "../../component/BottomBar";
import MyButton from "../../component/MyButton";
import MyInput from "../../component/MyInput";
import { login, selectUser } from "../../redux/features/userSlice";
import { flaskAuthInstance } from "../../routes";
import { FontAwesome5 } from "@expo/vector-icons";

export default function EditProfile({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [edit_pwd1, setedit_pwd1] = useState("");
  const [edit_pwd2, setedit_pwd2] = useState("");
  const [edit_name, setedit_name] = useState(user.name);
  const [old_pwd, setold_pwd] = useState("");

  const [editPassword, setEditPassword] = useState(false);
  const [oldPwdError, setOldPwdError] = useState(false);
  const [isOldPwdOkay, setIsOldPwdOkay] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [pwd2Error, setPwd2Error] = useState(false);
  const [saveEdit, setSaveEdit] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const get_res_password_matches = async () => {
    try {
      await flaskAuthInstance
        .post(
          `/check-password`,
          { email: user.email, pwd: old_pwd },
          { headers: { "content-type": "application/json" } }
        )
        .then((res) => {
          if (res.data["status"]) {
            setOldPwdError(false);
            setIsOldPwdOkay(true);
          } else {
            setOldPwdError(true);
            setIsOldPwdOkay(false);
          }
        });
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (edit_pwd1.length > 1) {
      if (edit_pwd1.length < 8) {
        setPwdError(true);
      } else {
        setPwdError(false);
      }
    }
    if (edit_pwd2.length > 1) {
      setSaveEdit(true);
      if (edit_pwd1 !== edit_pwd2) {
        setPwd2Error(true);
      } else {
        setPwd2Error(false);
      }
    }
  }, [edit_pwd1, edit_pwd2]);

  const oneditBtn = () => {
    setIsSaving(true);
    if (edit_name.length == 0) {
      alert("Please input your name");
      setIsSaving(false);
    } else {
      setTimeout(async () => {
        const data = {
          email: user.email,
          password:
            isOldPwdOkay && !pwdError && !pwd2Error ? edit_pwd2 : old_pwd,
          name: edit_name,
        };
        try {
          await flaskAuthInstance
            .post(`/update`, data, {
              header: { "Content/Type": "application/json" },
            })
            .then((res) => {
              dispatch(
                login({
                  name: res.data.name,
                  email: res.data.email,
                  phone_number: res.data.phone_number,
                })
              );
            })
            .then(() => navigation.navigate("Profile"));
        } catch (err) {
          alert("ooops... there's an error");
          setIsSaving(false);

          console.log(err);
        }
      }, 1000);
    }
  };
  useEffect(() => {
    if (user.name != edit_name) {
      setSaveEdit(true);
    } else {
      setSaveEdit(false);
    }
  }, [edit_name]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={{ alignItems: "center" }}>
          <Image style={styles.image} source={img} />
        </View>
        <View>
          <MyInput
            label="Name"
            placeholder={user.name}
            valueInput={edit_name}
            onChangeText={setedit_name}
          />
          <MyInput label="Email" placeholder={user.email} />
          <MyInput label="Phone Number" placeholder={user.phone_number} />
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.editPass_btn}
              onPress={() => setEditPassword((current) => !current)}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "cold",
                  color: "red",
                }}
              >
                {editPassword ? (
                  <Text style={{ color: "#E49531" }}>Cancel Edit Password</Text>
                ) : (
                  <Text style={{ color: "#E49531" }}>Edit Password</Text>
                )}
              </Text>
            </TouchableOpacity>
          </View>
          {editPassword && (
            <>
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: widthPercentageToDP(90),
                }}
              >
                <MyInput
                  label="Old Password"
                  placeholder="Enter your old Password"
                  valueInput={old_pwd}
                  onChangeText={setold_pwd}
                  isPassword={true}
                  icon={
                    <FontAwesome5
                      name="arrow-alt-circle-right"
                      size={24}
                      color={!isOldPwdOkay ? "#002145" : "gray"}
                    />
                  }
                  onPress={() => get_res_password_matches()}
                  editable={!isOldPwdOkay}
                  selectTextOnFocus={!oldPwdError}
                  color={!isOldPwdOkay ? "black" : "gray"}
                />
                {oldPwdError && (
                  <Text style={{ color: "red" }}>Incorrect password</Text>
                )}
                {/* <MyInput
                  label="Old Password"
                  placeholder="Old password"
                  isPassword={true}
                  valueInput={edit_pwd1}
                  onChangeText={setedit_pwd1}
                  editable={isOldPwdOkay}
                  selectTextOnFocus={isOldPwdOkay}
                  color={isOldPwdOkay ? "black" : "#d2d2d2"}
                  // moreStyles={{ width: widthPercentageToDP(43) }}
                /> */}
                {pwdError && (
                  <Text style={{ marginTop: -12, color: "red" }}>
                    Oops, weak password.
                  </Text>
                )}
                <MyInput
                  label="New Password"
                  placeholder="New password"
                  isPassword={true}
                  valueInput={edit_pwd2}
                  onChangeText={setedit_pwd2}
                  editable={isOldPwdOkay}
                  selectTextOnFocus={isOldPwdOkay}
                  color={isOldPwdOkay ? "black" : "#d2d2d2"}
                  // moreStyles={{ width: widthPercentageToDP(43) }}
                />
                {pwd2Error && (
                  <Text style={{ marginTop: -12, color: "red" }}>
                    Oops, your password does'nt match
                  </Text>
                )}
              </View>
            </>
          )}
        </View>
        {saveEdit && (
          <View style={{ alignItems: "center" }}>
            <MyButton
              text={isSaving ? "Saving..." : "Apply Change"}
              onPress={() => oneditBtn()}
            />
          </View>
        )}
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          paddingTop: 10,
          backgroundColor: "#fff",
        }}
      >
        <BottomBar Pactive={true} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    paddingBottom: heightPercentageToDP(12),
  },
  content: {
    // justifyContent: "space-around",
  },
  editPass_btn: {
    flexDirection: "row",
    justifyContent: "center",
    width: widthPercentageToDP(50),
    padding: 10,
    borderRadius: 10,
    backgroundColor: "Fff",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: heightPercentageToDP(50),
    borderWidth: 4,
    borderColor: "#E49531",
  },
});
