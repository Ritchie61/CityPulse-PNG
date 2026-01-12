import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, Alert } from "react-native";
import { fetchReports } from "../services/api";

export default function HomeScreen({ navigation }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await fetchReports();
      setReports(data);
    } catch (err) {
      Alert.alert("Backend not reachable yet");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("MapView")}
      style={{ padding: 12, borderBottomWidth: 1 }}
    >
      <Text style={{ fontWeight: "bold" }}>{item.type}</Text>
      <Text>{item.description}</Text>
      <Text>Status: {item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button
        title="Report New Hazard"
        onPress={() => navigation.navigate("ReportHazard")}
      />
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
