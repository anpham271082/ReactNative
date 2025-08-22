import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { RootStackParamList } from "../types/Navigations"; // import đúng path ButtonGrid

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RegisterScreen"
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props) {
    const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleRegister = () => {
    setNameError(name ? "" : "Name is required");
    setEmailError(
      email ? (/^\S+@\S+\.\S+$/.test(email) ? "" : "Enter a valid email") : "Email is required"
    );
    setPasswordError(password ? "" : "Password is required");
    setConfirmPasswordError(
      confirmPassword
        ? password === confirmPassword
          ? ""
          : "Passwords do not match"
        : "Confirm password is required"
    );

    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      console.log("Register success");
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/lottie-header.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Please enter your details</Text>

      <TextInput
        label={nameError || "Name"}
        value={name}
        onChangeText={setName}
        mode="outlined"
        left={<TextInput.Icon icon="account" />}
        style={styles.input}
        error={!!nameError}
      />

      <TextInput
        label={emailError || "Email"}
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        left={<TextInput.Icon icon="account-circle" />}
        style={styles.input}
        error={!!emailError}
      />

      <TextInput
        label={passwordError || "Password"}
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry={!showPassword}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye" : "eye-off"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        style={styles.input}
        error={!!passwordError}
      />

      <TextInput
        label={confirmPasswordError || "Confirm Password"}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        mode="outlined"
        secureTextEntry={!showConfirmPassword}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={showConfirmPassword ? "eye" : "eye-off"}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        }
        style={styles.input}
        error={!!confirmPasswordError}
      />

      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.login}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 50 },
  lottie: { width: 180, height: 180 },
  title: { fontSize: 24, fontWeight: "bold", alignSelf: "flex-start", marginLeft: 25 },
  subtitle: { fontSize: 18, alignSelf: "flex-start", marginLeft: 25, fontWeight: "300", marginBottom: 16 },
  input: { width: "90%", marginVertical: 4 },
  button: { width: "60%", marginVertical: 16 },
  login: { color: "#6200ee", marginTop: 8 },
});
