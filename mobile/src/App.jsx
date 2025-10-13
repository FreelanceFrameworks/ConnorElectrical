import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./screens/Profile/DashboardScreen.js";
import BookingScreen from "./screens/Bookings/BookingScreen"; // next
import PaymentScreen from "./screens/Payments/PaymentScreen";
import AdminDashboardScreen from "./screens/Profile/AdminDashboardScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Auth Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        {/* Main App Screens */}
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
