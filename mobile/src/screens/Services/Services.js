import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import client from "../../api/client";

export default function ServicesScreen() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    client.get("/services")
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Available Services</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.name} – ${item.price}</Text>
            <Button title="Book Now" onPress={() => console.log("Book", item.id)} />
          </View>
        )}
      />
    </View>
  );
}
