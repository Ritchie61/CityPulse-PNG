import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { fetchReports } from "../services/api";

export default function MapViewScreen({ route }) {
  const [location, setLocation] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Enable location to see nearby hazards");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();

    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await fetchReports();
      setReports(data);
    } catch (e) {
      Alert.alert("Error loading reports", e.message);
    }
  };

  if (!location) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {reports.map((report) => (
        <Marker
          key={report.id}
          coordinate={{
            latitude: report.latitude,
            longitude: report.longitude,
          }}
          title={report.type}
          description={report.description}
          pinColor={report.status === "resolved" ? "green" : "red"}
        />
      ))}
    </MapView>
  );
}
