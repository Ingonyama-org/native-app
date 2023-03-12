import React from "react";
import onboardimg3 from "../../assets/img/onboarding/onboarding3.jpg";
import BaseOnboarding from "./BaseOnboarding";
export default function Onboarding3() {
  return (
    <BaseOnboarding
      img={onboardimg3}
      title="Let's Join Forces and Save our Predators."
      desc="Help us come up with statistical and scientific 
      findings on what exactly is happening to our predators and how exactly can we mitigate that."
      btnText="Lets Go"
      onPress={"Login"}
    />
  );
}
