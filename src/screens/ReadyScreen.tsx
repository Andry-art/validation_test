import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  SafeAreaView,
  Image,
  Easing,
} from "react-native";
import Button from "../components/Button";
import { COLORS } from "../../assets/colors";
import backGroundSource from "../../assets/images/bg.png";
import checkSource from "../../assets/images/check.png";
import { FONT_FAMILY } from "../../assets/constFonts";

interface Props {
  navigation?: any;
}

const ReadyScreen: FC<Props> = ({ navigation }) => {
  const moveBack = () => {
    navigation.goBack();
  };

  const resize = new Animated.Value(0);

  Animated.timing(resize, {
    toValue: 1,
    duration: 500,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start(() => {
    resize.setValue(1);
  });

  const scale = resize.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 2, 1],
  });

  return (
    <ImageBackground
      source={backGroundSource}
      resizeMode="cover"
      style={styles.imageContainer}
    >
      <SafeAreaView style={styles.containerDone}>
        <Animated.View
          style={[
            {
              width: 66,
              height: 66,
              backgroundColor: COLORS.green,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            },
            { transform: [{ scale }] },
          ]}
        >
          <Image
            source={checkSource}
            style={{
              width: 35,
              height: 23,
            }}
          />
        </Animated.View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            textAlign: "center",
            fontFamily: FONT_FAMILY.Raleway,
            marginTop: 50,
          }}
        >
          Готово
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "400",
            textAlign: "center",
            fontFamily: FONT_FAMILY.Raleway,
            color: COLORS.gray,
            marginTop: 10,
          }}
        >
          Заявка отправлена. Мы с вами свяжемся в ближайший час.
        </Text>
        <Button title="Ok" style={styles.button} onPress={moveBack} />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  containerDone: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  button: {
    position: "absolute",
    bottom: 40,
    backgroundColor: COLORS.active,
  },
});

export default ReadyScreen;
