import { useNavigation } from "@react-navigation/native";
import React from "react";
import onboardimg2 from "../../assets/img/onboarding/onboarding2.jpeg";
import BaseOnboarding from "./BaseOnboarding";

export default function Onboarding2() {
  return (
    <BaseOnboarding
      img={onboardimg2}
      title="Tech and Community "
      desc="The two major ingredients to move fast and be effective."
      btnText="Next"
      onPress={"Onboarding3"}
    />
  );
}
