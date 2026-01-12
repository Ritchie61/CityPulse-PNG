import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, Alert } from "react-native";
import { fetchReports } from "../services/api";
import { syncOfflineReports } from "../services/offlineStorage";

export default function HomeScreen({ navigation, route }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
    // Sync any offline reports on app start
    syncOfflineReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await fetchReports();
      setReports(data);
    } catch (e) {
      Alert.alert("Error loading reports", e.message);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("MapView", { selectedReport: item })}
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
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
        onPress={() => navigation.navigate("ReportHazard", { user_id: route.params.user_id })}
      />
      <FlatList
        data={reports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
