import { Platform } from "react-native";

const EMULATOR_HOST = "10.0.2.2";  // special Android emulator alias to localhost
const LOCAL_IP = "10.199.123.97";   // replace with your computer’s IPv4 address

const API_BASE_URL =
  Platform.OS === "android"
    ? EMULATOR_HOST
    : "localhost"; // iOS simulator can use localhost directly

export const API_URL = `http://${API_BASE_URL}:5000`; // your backend port
