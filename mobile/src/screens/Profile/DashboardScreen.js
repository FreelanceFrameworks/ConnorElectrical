// client/screens/DashboardScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function DashboardScreen({ navigation, route }) {
  // Assume email was passed in after login
  const email = route.params?.email || "Guest";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {email}!</Text>

      <Button title="Book a Service" onPress={() => navigation.navigate("Booking")} />
      <Button title="My Bookings" onPress={() => navigation.navigate("MyBookings")} />
      <Button title="Make Payment" onPress={() => navigation.navigate("Payment")} />

      {/* Admin only – later we’ll gate this with a role */}
      <Button title="Admin Dashboard" onPress={() => navigation.navigate("AdminDashboard")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
});
