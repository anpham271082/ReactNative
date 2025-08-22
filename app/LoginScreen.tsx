import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { RootStackParamList } from "../types/Navigations"; // import đúng path ButtonGrid

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
    const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    setEmailError(email ? "" : "Email is required");
    setPasswordError(password ? "" : "Password is required");

    if (email && password) {
      console.log("Login success");
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
      <Text style={styles.title}>Login</Text>

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

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>

      <TouchableOpacity onPress={() => console.log("Forgot password")}>
        <Text style={styles.forgot}>Forget Password?</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <Text>Not a member? </Text>
        <TouchableOpacity onPress={() => router.push({ pathname: "/RegisterScreen"})}>
          <Text style={styles.signup}>Sign up now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 50 },
  lottie: { width: 300, height: 300 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: { width: "90%", marginVertical: 4 },
  button: { width: "60%", marginVertical: 16 },
  forgot: { color: "#6200ee", marginVertical: 8 },
  row: { flexDirection: "row", marginTop: 50 },
  signup: { color: "#6200ee" },
});
