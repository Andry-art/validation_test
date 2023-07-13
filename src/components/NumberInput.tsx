import React, { ComponentProps, FC, useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../assets/colors";
import CountryPicker from "react-native-country-picker-modal";
import { useDeviceOrientation } from "@react-native-community/hooks";

type Props = ComponentProps<typeof TextInput> & {
  label: string;
  errorText?: string | null;
};

const NumberInput: FC<Props> = (props) => {
  const { label, errorText, value, style, onBlur, onFocus, ...restOfProps } =
    props;
  const [isFocused, setIsFocused] = useState(false);
  const [code, setCode] = useState("+7");
  const [isVisible, setIsVisible] = useState(false);
  const isPortrait = useDeviceOrientation() === "portrait";

  const inputRef = useRef<TextInput>(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 500,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  let color = isFocused ? COLORS.borderColorsActive : COLORS.white;
  let colorText = isFocused ? COLORS.gray : COLORS.black;
  if (errorText) {
    color = "#B00020";
  }

  return (
    <View style={style}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[
            {
              width: 64,
              height: 55,
              backgroundColor: COLORS.white,
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              display: "flex",
            },
            {
              opacity: focusAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  scaleX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}
          onPress={() => setIsVisible(true)}
        >
          <CountryPicker
            countryCode="RU"
            withEmoji
            withFilter
            withAlphaFilter
            withCallingCode
            onSelect={(item) => {
              setCode(`+${item.callingCode[0]}`), setIsFocused(true);
            }}
            containerButtonStyle={{
              opacity: 0,
              position: "absolute",
            }}
            visible={isVisible}
            onClose={() => {
              setIsVisible(false), setIsFocused(true);
            }}
          />
          <Text>{code}</Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            width: "100%",
            transform: [
              {
                scaleX: focusAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: isPortrait ? [1, 0.8] : [1, 0.9],
                }),
              },
              {
                translateX: focusAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: isPortrait ? [-65, -35] : [-65, -27],
                }),
              },
            ],
          }}
        >
          <TextInput
            style={[
              isFocused ? styles.inputScaled : styles.input,
              {
                borderColor: color,
              },
            ]}
            ref={inputRef}
            {...restOfProps}
            value={value}
            onBlur={(event) => {
              setIsFocused(false);
              onBlur?.(event);
            }}
            onFocus={(event) => {
              setIsFocused(true);
              onFocus?.(event);
            }}
          />
        </Animated.View>
      </View>
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 10],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [5, -3],
                  }),
                },
              ],
              opacity: focusAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color: colorText,
              },
            ]}
          >
            {label}
            {errorText ? "*" : ""}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 16,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    fontSize: 16,
    height: 55,
  },
  inputScaled: {
    paddingLeft: 16,
    borderWidth: 1,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    fontSize: 16,
    height: 55,
  },
  labelContainer: {
    position: "absolute",
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 15,
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: "#B00020",
  },
});

export default NumberInput;
