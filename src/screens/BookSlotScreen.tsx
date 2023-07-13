import React, { FC, useEffect, useMemo, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
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
import { useFormik } from "formik";
import * as yup from "yup";
import ReadyScreen from "./ReadyScreen";

interface Props {
  navigation?: any;
}

const initialValues = {
  name: "",
  email: "",
  phone: "",
};

const bookSchema = yup.object({
  name: yup
    .string()
    .matches(/^[А-я]+$/, {
      message: "Введите нормальное имя",
    })
    .min(3, "Введите нормальное имя")
    .max(10, "Допустимо максимум 10 символов"),
  email: yup
    .string()
    .email("Введите корректный емэйл")
    .min(10, "Введите корректный емэйл")
    .max(30, "Введите корректный емэйл"),
  phone: yup
    .string()
    .min(7, "Введите корректный номер телефона")
    .max(13, "Введите корректный номер телефона"),
});

const BookSlotScreen: FC<Props> = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const isPortrait = useDeviceOrientation() === "portrait";
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    isValid,
    dirty,
    validateField,
    setFieldValue,
  } = useFormik<{
    name: string;
    email: string;
    phone: string;
  }>({
    initialValues: initialValues,
    validationSchema: bookSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      Keyboard.dismiss();
      setTimeout(() => {
        setIsLoading(false);
        setIsSent(true);
      }, 2000);
    },
  });

  const isAllFieldsFillUp = !!values.email && !!values.name && !!values.phone;

  const handleChangeName = (value: string) => {
    setFieldValue(
      "name",
      value.replace(/[&\/\\#, +()$~%.'":*?<>{}@!^"|:""№;_=0-9]/g, ""),
      true
    );
  };

  const handleChangePhone = (value: string) => {
    setFieldValue(
      "phone",
      value.replace(/[&\/\\#, +()$~%.'":*?<>{}@!^"|:""№;_=aA-zZ аА-яЯ]/g, ""),
      true
    );
  };

  const onFocusName = () => {
    validateField("name");
  };
  const onFocusEmail = () => {
    validateField("email");
  };

  const onFocusPhone = () => {
    validateField("phone");
  };

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

  if (isSent) {
    return <ReadyScreen navigation={navigation} />;
  }
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
              <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
                style={styles.container}
              >
                <SafeAreaView style={styles.container}>
                  <Text style={styles.title}>Забронировать слот</Text>
                  <Text style={styles.description}>
                    Оставьте контактные данные, и мы с вами свяжемся в ближайший
                    час.
                  </Text>
                  <View style={styles.contentContainer}>
                    <View style={styles.inputContainer}>
                      <FormField
                        label="Имя"
                        style={styles.input}
                        onChangeText={handleChangeName}
                        value={values.name}
                        errorText={errors.name}
                        onFocus={onFocusName}
                      />
                      <FormField
                        label="E-mail"
                        style={styles.input}
                        onChangeText={handleChange("email")}
                        value={values.email}
                        errorText={errors.email}
                        onFocus={onFocusEmail}
                        keyboardType="email-address"
                      />
                      <NumberInput
                        label="Номер телефона"
                        style={styles.input}
                        onChangeText={handleChangePhone}
                        value={values.phone}
                        errorText={errors.phone}
                        onFocus={onFocusPhone}
                        keyboardType="number-pad"
                      />
                    </View>
                    <Button
                      title="Отправить"
                      disable={!(isValid && isChecked && isAllFieldsFillUp)}
                      onPress={handleSubmit}
                      style={[
                        isValid && isChecked && isAllFieldsFillUp
                          ? styles.buttonActive
                          : styles.buttonInActive,
                        { marginBottom: buttonMargin },
                      ]}
                      isLoading={isLoading}
                    />
                  </View>
                </SafeAreaView>
              </TouchableWithoutFeedback>
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
              <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
                style={styles.container}
              >
                <SafeAreaView style={styles.container}>
                  <Text style={styles.title}>Забронировать слот</Text>
                  <Text style={styles.description}>
                    Оставьте контактные данные, и мы с вами свяжемся в ближайший
                    час.
                  </Text>
                  <View style={styles.contentContainer}>
                    <View style={styles.inputContainer}>
                      <FormField
                        label="Имя"
                        style={styles.input}
                        onChangeText={handleChangeName}
                        value={values.name}
                        errorText={errors.name}
                        onFocus={onFocusName}
                      />
                      <FormField
                        label="Email"
                        style={styles.input}
                        onChangeText={handleChange("email")}
                        value={values.email}
                        errorText={errors.email}
                        onFocus={onFocusEmail}
                        keyboardType="email-address"
                      />
                      <NumberInput
                        label="Номер телефона"
                        style={styles.input}
                        onChangeText={handleChangePhone}
                        value={values.phone}
                        errorText={errors.phone}
                        onFocus={onFocusPhone}
                        keyboardType="number-pad"
                      />
                    </View>
                    <View>
                      <Button
                        title="Отправить"
                        disable={!(isValid && isChecked && isAllFieldsFillUp)}
                        onPress={handleSubmit}
                        style={
                          isValid && isChecked && isAllFieldsFillUp
                            ? styles.buttonActive
                            : styles.buttonInActive
                        }
                        isLoading={isLoading}
                      />

                      <View style={styles.checkContainerLandscape}>
                        <CheckBox
                          isChecked={isChecked}
                          onPress={onCheckPress}
                        />
                        <Text style={styles.checkText}>
                          Я даю согласие на обработку своих данных.
                        </Text>
                      </View>
                    </View>
                  </View>
                </SafeAreaView>
              </TouchableWithoutFeedback>
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
  buttonActive: {
    backgroundColor: COLORS.active,
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
