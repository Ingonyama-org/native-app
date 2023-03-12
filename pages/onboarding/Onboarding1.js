import React from "react";
import BaseOnboarding from "./BaseOnboarding";
import onboardimg1 from "../../assets/img/onboarding/onboarding1.jpg";

export default function Onboarding1() {
  return (
    <BaseOnboarding
      img={onboardimg1}
      title="Ingonyama"
      desc="An intelligent people centred mobile application that engages the community in activities on predators and coexistence and 
      Incentives nature stewards for their conservation efforts."
      btnText="Next"
      onPress={"Onboarding2"}
    />
  );
}
