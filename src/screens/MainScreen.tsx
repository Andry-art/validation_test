import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import { COLORS } from "../../assets/colors";

interface Props {
  navigation: any;
}

const MainScreen: FC<Props> = ({ navigation }) => {
  const moveToBookSlot = () => {
    navigation.navigate("BookSlot");
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title={"Забронировать слот"}
        onPress={moveToBookSlot}
      />
    </View>
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

export default MainScreen;
