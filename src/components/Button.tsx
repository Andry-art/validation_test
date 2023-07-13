import React, { FC } from "react";
import {
  Text,
  StyleSheet,
  StyleProp,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";
import { COLORS } from "../../assets/colors";
import loaderIconSource from "../../assets/images/loader.png";

interface Props {
  title: string;
  style?: StyleProp<any>;
  onPress: () => void;
  disable?: boolean;
  isLoading?: boolean;
}

const Button: FC<Props> = ({ title, style, onPress, disable, isLoading }) => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start(() => {
    spinValue.setValue(0);
  });

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, style]}
      onPress={onPress}
      disabled={disable}
    >
      {isLoading ? (
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Image source={loaderIconSource} />
        </Animated.View>
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: 55,
    backgroundColor: COLORS.default,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.white,
  },
});

export default Button;
