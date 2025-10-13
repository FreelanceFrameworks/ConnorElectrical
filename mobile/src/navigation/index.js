import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import ServicesScreen from "../screens/Services/ServicesScreen";
import QuotesScreen from "../screens/Quotes/QuotesScreen";
import BookingsScreen from "../screens/Bookings/BookingsScreen";
import PaymentsScreen from "../screens/Payments/PaymentsScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Services" component={ServicesScreen} />
        <Tab.Screen name="Quotes" component={QuotesScreen} />
        <Tab.Screen name="Bookings" component={BookingsScreen} />
        <Tab.Screen name="Payments" component={PaymentsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
