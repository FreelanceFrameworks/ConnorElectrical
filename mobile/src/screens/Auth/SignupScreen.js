import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import client from "../../api/client";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await client.post("/auth/signup", { email, password });
      Alert.alert("Success", "Account created! Please login.");
      navigation.replace("Login");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Signup failed");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Sign Up
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
      <Button title="Sign Up" onPress={handleSignup} />
      <Text
        style={{ marginTop: 15, color: "blue" }}
        onPress={() => navigation.replace("Login")}
      >
        Already have an account? Login
      </Text>
    </View>
  );
}
