import React, { ComponentProps, FC, useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS } from "../../assets/colors";
import { FONT_FAMILY } from "../../assets/constFonts";

type Props = ComponentProps<typeof TextInput> & {
  label: string;
  errorText?: string | null;
};

const TextField: FC<Props> = (props) => {
  const {
    label,
    errorText,
    value,
    style,
    onBlur,
    onFocus,
    id,
    ...restOfProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);
  const focusAnim = useRef(new Animated.Value(0)).current;
  console.log(errorText);
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
    COLORS.red;
  }

  return (
    <View style={style}>
      <TextInput
        style={[
          styles.input,
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
    paddingTop: 26,
    paddingBottom: 10,
    borderWidth: 1,
    borderRadius: 12,
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
    marginLeft: 12,
    fontSize: 13,
    fontFamily: FONT_FAMILY.Raleway,
    fontWeight: "400",
    color: COLORS.red,
  },
});

export default TextField;
