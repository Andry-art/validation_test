import React, { useEffect, useMemo, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import backGroundSource from "../../assets/images/bg.png";
import { COLORS } from "../../assets/colors";
import { FONT_FAMILY } from "../../assets/constFonts";
import FormField from "../components/Input";
import NumberInput from "../components/NumberInput";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDeviceOrientation } from "@react-native-community/hooks";

const BookSlotScreen = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const isPortrait = useDeviceOrientation() === "portrait";

  const onCheckPress = () => {
    setIsChecked((state) => !state);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      () => {
        setIsKeyboardShow(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        setIsKeyboardShow(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const buttonMargin = useMemo(
    () => (isKeyboardShow ? 18 : 60),
    [isKeyboardShow]
  );

  return (
    <>
      {isPortrait ? (
        <>
          <KeyboardAvoidingView
            enabled={Platform.OS === "ios"}
            behavior={"padding"}
            style={styles.container}
          >
            <ImageBackground
              source={backGroundSource}
              resizeMode="cover"
              style={styles.imageContainer}
            >
              <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Забронировать слот</Text>
                <Text style={styles.description}>
                  Оставьте контактные данные, и мы с вами свяжемся в ближайший
                  час.
                </Text>
                <View style={styles.contentContainer}>
                  <View style={styles.inputContainer}>
                    <FormField label="Имя" style={styles.input} />
                    <FormField label="Email" style={styles.input} />
                    <NumberInput label="Номер телефона" style={styles.input} />
                  </View>
                  <Button
                    title="Отправить"
                    onPress={() => {}}
                    style={[
                      styles.buttonInActive,
                      { marginBottom: buttonMargin },
                    ]}
                  />
                </View>
              </SafeAreaView>
            </ImageBackground>
          </KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <View style={styles.checkContainer}>
              <CheckBox isChecked={isChecked} onPress={onCheckPress} />
              <Text style={styles.checkText}>
                Я даю согласие на обработку своих данных.
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <KeyboardAwareScrollView>
            <ImageBackground
              source={backGroundSource}
              resizeMode="cover"
              style={styles.imageContainer}
            >
              <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Забронировать слот</Text>
                <Text style={styles.description}>
                  Оставьте контактные данные, и мы с вами свяжемся в ближайший
                  час.
                </Text>
                <View style={styles.contentContainer}>
                  <View style={styles.inputContainer}>
                    <FormField label="Имя" style={styles.input} />
                    <FormField label="Email" style={styles.input} />
                    <NumberInput label="Номер телефона" style={styles.input} />
                  </View>
                  <View>
                    <Button
                      title="Отправить"
                      onPress={() => {}}
                      style={styles.buttonInActive}
                    />

                    <View style={styles.checkContainerLandscape}>
                      <CheckBox isChecked={isChecked} onPress={onCheckPress} />
                      <Text style={styles.checkText}>
                        Я даю согласие на обработку своих данных.
                      </Text>
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </ImageBackground>
          </KeyboardAwareScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: FONT_FAMILY.Raleway,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "400",
    color: COLORS.gray,
    fontFamily: FONT_FAMILY.Raleway,
    marginTop: 8,
  },
  inputContainer: {
    marginTop: 32,
  },
  input: {
    marginBottom: 16,
  },
  buttonInActive: {
    backgroundColor: COLORS.disable,
    marginBottom: 8,
  },
  checkContainer: {
    position: "absolute",
    bottom: 50,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkText: {
    marginLeft: 12,
    color: COLORS.gray,
    fontSize: 13,
    fontFamily: FONT_FAMILY.Raleway,
  },
});

export default BookSlotScreen;
