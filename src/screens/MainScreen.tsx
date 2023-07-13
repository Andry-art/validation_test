import React, { FC } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Button from "../components/Button";
import { COLORS } from "../../assets/colors";
import backGroundSource from "../../assets/images/bg.png";

interface Props {
  navigation: any;
}

const MainScreen: FC<Props> = ({ navigation }) => {
  const moveToBookSlot = () => {
    navigation.navigate("BookSlot");
  };

  return (
    <ImageBackground
      source={backGroundSource}
      resizeMode="cover"
      style={styles.container}
    >
      <Button
        style={styles.button}
        isLoading={false}
        title={"Забронировать слот"}
        onPress={moveToBookSlot}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: COLORS.active,
  },
});

export default MainScreen;
