import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS } from "../../assets/colors";
import checkSource from "../../assets/images/check.png";

interface Props {
  isChecked: boolean;
  onPress: () => void;
}

const CheckBox: FC<Props> = ({ isChecked, onPress }) => {
  return (
    <TouchableOpacity
      style={isChecked ? styles.containerActive : styles.containerInActive}
      onPress={onPress}
    >
      {isChecked && <Image source={checkSource} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerInActive: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  containerActive: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.active,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CheckBox;
