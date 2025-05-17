import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import server from "../constants/server.js";

function Login({ setScreen }) {
  const [email, setEmail] = useState("yaxbarot2605@gmail.com");
  const [password, setPassword] = useState("Yaxbarot@1826");

  function resetHandler() {
    // setEmail("");
    // setPassword("");
  }

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Please fill both fields");
    }
    try {
      const res = await fetch(`${server.host}/customer/login/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();

      if (json?.status?.code === 201) {
        await AsyncStorage.setItem(
          "auth_token",
          json?.data?.customer_access_token
        );
        setScreen("home");
      } else {
        Alert.alert("Error", json?.status?.message, [
          { text: "okay!", style: "destructive", onPress: resetHandler },
        ]);
      }
    } catch (err) {
      Alert.alert("Network error", err.message);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/test_background.png")}
      style={styles.rootContainer}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.loginContainer}>
          <Text style={styles.Heading}>Login</Text>

          <Text style={styles.labels}>EMAIL ADDRESS </Text>
          <TextInput
            style={styles.inputFields}
            value={email}
            placeholder="you@example.com"
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <Text style={styles.labels}>PASSWORD</Text>
          <TextInput
            style={styles.inputFields}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.loginButton}>
            <PrimaryButton
              onPress={handleLogin}
              additional_style={{
                backgroundColor: "black",
                width: "80%",
                alignSelf: "center",
                height: 40,
              }}
              font_style={{ fontSize: 19 }}
            >
              Log in
            </PrimaryButton>
          </View>

          <View style={styles.footerRow}>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.signupText}>Signup!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  flex: { flex: 1, justifyContent: "flex-end" },
  rootContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  loginContainer: {
    backgroundColor: "white",
    alignItems: "center",
    height: "60%",
    borderTopRightRadius: 100,
  },
  Heading: {
    fontWeight: "800",
    fontSize: 36,
    margin: 30,
  },
  labels: {
    color: "#888888",
    marginLeft: "11%",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  inputFields: {
    marginBottom: 20,
    backgroundColor: "#E0E0E0",
    width: "80%",
    height: 60,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 18,
  },
  loginButton: {
    margin: 30,
    width: "100%",
  },
  footerRow: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 16,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#888888",
    alignSelf: "center",
  },
  signupText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FF7F50",
    alignSelf: "center",
  },
});
export default Login;
