import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";

import Onboarding1 from "../pages/onboarding/Onboarding1";
import Onboarding2 from "../pages/onboarding/Onboarding2";
import Onboarding3 from "../pages/onboarding/Onboarding3";
import Login from "../pages/registration/Login";
import Signup from "../pages/registration/Signup";
import Verify from "../pages/registration/Verify";
import Success from "../pages/registration/Success";
import HomeCamera from "../pages/home/HomeCamera";
import Gallery from "../pages/Gallery/Gallery";
import ViewImage from "../pages/Gallery/ViewImage";
import SubmitImage from "../pages/Gallery/SubmitImage";
import Feeds from "../pages/feeds/Feeds";
import ReadStories from "../pages/feeds/stories/ReadStories";
import Notifications from "../pages/notification/Notifications";
import Map from "../pages/map/Map";
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";

const Stack = createNativeStackNavigator();

export default function NavigationUtility() {
  const user = useSelector(selectUser);
  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator initialRouteName="Onboarding1">
          <Stack.Screen
            name="Onboarding1"
            component={Onboarding1}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Onboarding2"
            component={Onboarding2}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Onboarding3"
            component={Onboarding3}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "", headerShadowVisible: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ title: "", headerShadowVisible: false }}
          />
          <Stack.Screen
            name="Verify"
            component={Verify}
            options={{ title: "", headerShadowVisible: false }}
          />
          <Stack.Screen
            name="Success"
            component={Success}
            options={{ title: "", headerShadowVisible: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeCamera}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Gallery"
            component={Gallery}
            options={{
              headerTitleAlign: "center",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "#d1c3a1",
              },
            }}
          />
          <Stack.Screen
            name="ViewImage"
            component={ViewImage}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#d1c3a1",
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="SubmitImage"
            component={SubmitImage}
            options={{
              title: "Submit Image",
              headerTitleAlign: "center",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Feeds"
            component={Feeds}
            options={{
              headerTitleAlign: "center",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "#e5bc5e",
              },
            }}
          />
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{
              headerTitleAlign: "center",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="ReadStories"
            component={ReadStories}
            options={{
              title: "",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              title: "Lion Hotspot",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShadowVisible: false,
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
