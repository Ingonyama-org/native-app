import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import MyButton from "../../component/MyButton";
import MyInput from "../../component/MyInput";
import img from "../../assets/img/splash.png";
import { flaskAuthInstance } from "../../routes";
import { login, uploadedPhoto } from "../../redux/features/userSlice";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  // const Buffer = require("buffer").Buffer;

  const [login_email, setLoginEmail] = useState("");
  const [login_pwd, setLoginPwd] = useState("");
  const [addToRedux, setAddToRedux] = useState(false);
  const [isLoggingIn, setIsLogginIn] = useState(false);

  const handleLogin = () => {
    if (login_email.length == 0 || login_pwd.length == 0) {
      alert("Please fill all fields");
      setIsLogginIn(false);
    } else {
      const data = {
        email: login_email.toLowerCase().replace(" ", ""),
        password: login_pwd,
      };
      try {
        setIsLogginIn(true);
        (async () => {
          await flaskAuthInstance
            .post(`/login`, data, {
              header: { "Content-Type": "application/json" },
            })
            .then((res) => {
              if (res.status === 200) {
                setAddToRedux(!addToRedux);
              } else if (res.status != 200) {
                setIsLogginIn(false);
              }
            })
            .catch(() => {
              alert("Ooops, there was an error");
              setIsLogginIn(false);
            });
        })();
      } catch {
        alert("Ooops, check your internet");
        setIsLogginIn(false);
      }
    }
  };

  useEffect(() => {
    setIsLogginIn(false);
    if (addToRedux) {
      setIsLogginIn(true);
      // try {
      (async () => {
        await flaskAuthInstance.get(`/login`).then((res) => {
          if (Object.keys(res.data).length > 0) {
            // console.log(res.data.img_byte);
            dispatch(
              login({
                name: res.data.name,
                email: res.data.email,
                date_joined: res.data.date_joined,
                age: res.data.age,
                gender: res.data.gender,
                nationality: res.data.nationality,
              })
            );

            // dispatch(
            //   uploadedPhoto({
            //     img: Buffer.from(res.data.img_byte).toString("base64"),
            //     time: res.data.time,
            //     date: res.data.date,
            //     location: `${res.data.actual_location[1][0].country},${
            //       res.data.actual_location[1][0].city
            //     },${
            //       res.data.actual_location[1][0].district
            //     },${res.data.actual_location[1][0].region.replace(" ", "")}`,
            //   })
            // );
          } else {
            setIsLogginIn(false);
            alert("Email or Passowrd is incorrect");
          }
          if (res.status != 200) {
            setIsLogginIn(false);
          }
        });
      })();
    }
    setTimeout(() => {
      setAddToRedux(false);
    }, 1000);
  }, [addToRedux]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image style={styles.image} source={img} />
        <Text style={styles.title}>Welcome back</Text>
      </View>
      <Text style={{ textAlign: "center", margin: 20 }}>
        Login to your account
      </Text>
      <View style={styles.content}>
        <MyInput
          label="Email:"
          placeholder="eg. lion@simba.com"
          valueInput={login_email}
          onChangeText={setLoginEmail}
        />
        <MyInput
          label="Password:"
          placeholder="********"
          isPassword={true}
          valueInput={login_pwd}
          onChangeText={setLoginPwd}
        />
        <MyButton
          text={!isLoggingIn ? "Login" : "Logging in..."}
          onPress={() => handleLogin()}
        />
        <View style={{ marginTop: 20 }}></View>
        <MyButton
          text="Create an Account"
          nobg={true}
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    color: "#E49531",
  },
  pageCount: {
    color: "#E49531",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: heightPercentageToDP(50),
    borderWidth: 4,
    borderColor: "#E49531",
  },
  content: {
    height: heightPercentageToDP(70),
    // justifyContent: "space-evenly",
    alignItems: "center",
  },
});
