import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import DefaultScreen from "./src";

const App = () => {
  return (
    <NavigationContainer>
      <DefaultScreen />
    </NavigationContainer>
  );
};

export default App;
