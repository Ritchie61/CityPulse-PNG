import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { createReport } from "../services/api";
import { saveOfflineReport } from "../services/offlineStorage";

export default function ReportHazardScreen({ navigation }) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const submitReport = async () => {
    const report = {
      id: Date.now(),
      type,
      description,
      status: "Pending",
    };

    try {
      await createReport(report);
      Alert.alert("Report submitted");
      navigation.goBack();
    } catch (err) {
      await saveOfflineReport(report);
      Alert.alert(
        "Offline",
        "No internet. Report saved and will sync later."
      );
      navigation.goBack();
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Hazard Type</Text>
      <TextInput
        value={type}
        onChangeText={setType}
        style={{ borderWidth: 1, marginBottom: 12 }}
      />

      <Text>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 12 }}
      />

      <Button title="Submit Report" onPress={submitReport} />
    </View>
  );
}
