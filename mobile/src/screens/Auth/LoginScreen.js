import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import client from "../../api/client";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await client.post("/auth/login", { email, password });
      Alert.alert("Success", `Welcome ${res.data.user.name}`);
      navigation.replace("Services"); // after login go to main
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Invalid email or password");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Login
      </Text>
      <Text>Email</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text
        style={{ marginTop: 15, color: "blue" }}
        onPress={() => navigation.navigate("Signup")}
      >
        Don’t have an account? Sign up
      </Text>
    </View>
  );
}
