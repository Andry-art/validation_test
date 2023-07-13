import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text } from "react-native";
import backGroundSource from "../../assets/images/bg.png";
import { COLORS } from "../../assets/colors";

const BookSlotScreen = () => {
  return (
    <ImageBackground
      source={backGroundSource}
      resizeMode="cover"
      style={styles.container}
    >
      <Text>Book Slot screen</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: COLORS.active,
  },
});

export default BookSlotScreen;
