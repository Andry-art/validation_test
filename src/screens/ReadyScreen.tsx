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
        <Animated.View style={[styles.circle, { transform: [{ scale }] }]}>
          <Image source={checkSource} style={styles.img} />
        </Animated.View>
        <Text style={styles.title}>Готово</Text>
        <Text style={styles.info}>
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
  circle: {
    width: 66,
    height: 66,
    backgroundColor: COLORS.green,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 35,
    height: 23,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: FONT_FAMILY.Raleway,
    marginTop: 50,
  },
  info: {
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: FONT_FAMILY.Raleway,
    color: COLORS.gray,
    marginTop: 10,
  },
});

export default ReadyScreen;
