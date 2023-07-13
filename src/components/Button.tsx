import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../assets/colors";

interface Props {
  title: string;
  style?: StyleProp<any>;
  onPress: () => void;
}

const Button: FC<Props> = ({ title, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
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
