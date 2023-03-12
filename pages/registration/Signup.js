import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import MyButton from "../../component/MyButton";
import MyInput from "../../component/MyInput";
import { useDispatch } from "react-redux";
import { flaskAuthInstance } from "../../routes";
import { FontAwesome5 } from "@expo/vector-icons";
import { login } from "../../redux/features/userSlice";

export default function Signup({ navigation }) {
  const dispatch = useDispatch();

  const [sign_email, setSign_email] = useState("");
  const [sign_pwd1, setSign_pwd1] = useState("");
  const [sign_pwd2, setSign_pwd2] = useState("");
  const [sign_name, setSign_name] = useState("");
  const [sign_btn, setSign_btn] = useState(false);
  const [isEmailIsOkay, setEmailIsOkay] = useState(false);
  const [sign_age, setSign_age] = useState("");
  const [sign_gender, setSign_gender] = useState("");
  const [sign_phoneNumber, setSignPhoneNumber] = useState("");
  const [sign_nationality, setSign_nationality] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [qualityError, setQualityErrorError] = useState(false);
  const [emailExistsError, setEmailExistError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [pwd2Error, setPwd2Error] = useState(false);
  const [valid_email, setValid_email] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setEmailError(true);
      setQualityErrorError(true);
      setEmailExistError(false);
      return false;
    } else {
      setEmailError(false);
      setQualityErrorError(false);
      setEmailExistError(false);
      return true;
    }
  };

  const post_check_email_exits = async (set_email) => {
    const data = { email: set_email };
    // try {
    await flaskAuthInstance.post(`/check-email`, data, {
      header: { "Content-Type": "application/json" },
    });
    // } catch (err) {
    //   alert(err.message);
    // }
  };

  useEffect(() => {
    if (sign_email.length > 1) {
      validate(sign_email);
      if (validate(sign_email)) {
        setValid_email(true);
        post_check_email_exits(sign_email.toLowerCase());
      } else {
        setValid_email(false);
      }
    }
  }, [sign_email]);

  const get_res_email_exist = async () => {
    if (sign_email.length > 7) {
      try {
        const res = await flaskAuthInstance.get(`/check-email`);
        console.log(res.data["status"]);
        if (res.data["status"]) {
          setEmailExistError(true);
          setEmailIsOkay(false);
        } else {
          setEmailExistError(false);
          setEmailIsOkay(true);
        }
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("Invalid Email");
    }
  };

  useEffect(() => {
    if (sign_pwd1.length > 1) {
      if (sign_pwd1.length < 8) {
        setPwdError(true);
      } else {
        setPwdError(false);
      }
    }
    if (sign_pwd2.length > 1) {
      if (sign_pwd1 !== sign_pwd2) {
        setPwd2Error(true);
      } else {
        setPwd2Error(false);
      }
    }
  }, [sign_pwd1, sign_pwd2]);

  const onSignBtn = () => {
    setIsCreating(true);
    // console.log(pwd2Error);
    if (sign_name.length == 0) {
      alert("Please input your name");
      setIsCreating(false);
    } else if (!valid_email || emailExistsError) {
      alert("Check your email input");
      setIsCreating(false);
    } else {
      if (!pwdError && !pwd2Error) {
        setTimeout(async () => {
          const data = {
            email: sign_email,
            password: sign_pwd2,
            name: sign_name,
            phone_number: sign_phoneNumber,
            // gender: sign_gender,
            // nationality: sign_nationality,
            // age: sign_age,
          };
          // console.log(data);
          try {
            await flaskAuthInstance.post(`/signup`, data, {
              header: { "Content/Type": "application/json" },
            });

            navigation.navigate("Success");
          } catch (err) {
            alert("ooops... there's an error");
            setIsCreating(false);
          }
        }, 1000);
      } else {
        setIsCreating(false);
        alert("Oops, please sort the field errors &/or check your internet");
        // res_check_email_exist();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>Personal Details</Text>
        <Text style={styles.pageCount}>1/2</Text>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          height: heightPercentageToDP(80),
        }}
      >
        <MyInput
          label="Full Name"
          placeholder="First & Second name"
          valueInput={sign_name}
          onChangeText={setSign_name}
        />
        <MyInput
          label="Phone Number"
          placeholder="include your country code (+254 ..)"
          valueInput={sign_phoneNumber}
          onChangeText={setSignPhoneNumber}
        />
        <MyInput
          label="Email"
          placeholder="eg. lion@simba.cat"
          emailError={emailError}
          valueInput={sign_email}
          onChangeText={setSign_email}
          icon={
            <FontAwesome5
              name="arrow-alt-circle-right"
              size={24}
              color={valid_email && !isEmailIsOkay ? "#002145" : "gray"}
            />
          }
          onPress={() => get_res_email_exist()}
          editable={!isEmailIsOkay}
          selectTextOnFocus={!isEmailIsOkay}
          color={!isEmailIsOkay ? "black" : "gray"}
        />
        {qualityError && (
          <Text style={{ marginTop: -12, color: "red" }}>
            Oops, Enter a valid email
          </Text>
        )}
        {emailExistsError && (
          <Text
            onpress={() => navigation.navigate("Login")}
            style={{ marginTop: -12, color: "red" }}
          >
            Oops, The Email Already exists. Login
          </Text>
        )}

        <MyInput
          label="Create Password"
          placeholder="********"
          isPassword={true}
          valueInput={sign_pwd1}
          onChangeText={setSign_pwd1}
          editable={isEmailIsOkay}
          selectTextOnFocus={isEmailIsOkay}
          color={isEmailIsOkay ? "black" : "#d2d2d2"}
        />
        {pwdError && (
          <Text style={{ marginTop: -12, color: "red" }}>
            Oops, weak password.
          </Text>
        )}
        <MyInput
          label="Confirm Password"
          placeholder="********"
          isPassword={true}
          valueInput={sign_pwd2}
          onChangeText={setSign_pwd2}
          editable={isEmailIsOkay}
          selectTextOnFocus={isEmailIsOkay}
          color={isEmailIsOkay ? "black" : "#d2d2d2"}
        />
        {pwd2Error && (
          <Text style={{ marginTop: -12, color: "red" }}>
            Oops, your password does'nt match
          </Text>
        )}
        <MyButton
          text={!isCreating ? "Create Account" : "Creating..."}
          onPress={() => onSignBtn()}
        />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text>Already have an account?</Text>
          <Text style={{ marginLeft: 3, color: "#E49531" }}>Login</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    color: "#E49531",
  },
  pageCount: {
    color: "#E49531",
  },
  content: {
    height: heightPercentageToDP(70),
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
