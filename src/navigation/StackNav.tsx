import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens/MainScreen";
import BookSlotScreen from "../screens/BookSlotScreen";
import { Image, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../assets/colors";
import backButonSource from "../../assets/images/backButton.png";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ title: "Главный экран" }}
      />
      <Stack.Screen
        name="BookSlot"
        component={BookSlotScreen}
        options={({ navigation, route }) => ({
          title: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={backButonSource} />
            </TouchableOpacity>
          ),
          headerTransparent: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
