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
import { MaskedTextInput } from "react-native-mask-text";

type Props = ComponentProps<typeof TextInput> & {
  label: string;
  errorText?: string | null;
  onChangeText: (text: string) => void;
};

const NumberInput: FC<Props> = (props) => {
  const {
    label,
    errorText,
    value,
    style,
    onBlur,
    onFocus,
    onChangeText,
    ...restOfProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [code, setCode] = useState("+7");
  const [isVisible, setIsVisible] = useState(false);
  const isPortrait = useDeviceOrientation() === "portrait";

  const inputRef = useRef<TextInput>(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value || !!errorText ? 1 : 0,
      duration: 500,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  let color = isFocused ? COLORS.borderColorsActive : COLORS.white;
  let colorText = isFocused ? COLORS.gray : COLORS.black;
  if (errorText) {
    color = COLORS.red;
  }

  return (
    <View style={style}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[
            styles.picker,
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
              setCode(`+${item.callingCode[0] ?? ""}`), setIsFocused(true);
            }}
            containerButtonStyle={styles.pickerFlag}
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
          <MaskedTextInput
            mask="(999)-999-99-99 99 9"
            type="underline"
            style={[
              isFocused || !!errorText || !!value
                ? styles.inputScaled
                : styles.input,
              {
                borderColor: color,
              },
            ]}
            ref={inputRef}
            {...restOfProps}
            onChangeText={(text, rawText) => {
              onChangeText(rawText);
            }}
            value={value}
            placeholder={isFocused ? "(***)-***-**-**" : ""}
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
    marginTop: 10,
    marginLeft: 80,
    fontSize: 12,
    color: COLORS.red,
  },
  picker: {
    width: 64,
    height: 55,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    display: "flex",
  },
  pickerFlag: {
    opacity: 0,
    position: "absolute",
  },
});

export default NumberInput;
