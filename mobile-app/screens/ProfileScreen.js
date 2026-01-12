import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert } from "react-native";

const API_BASE = "https://YOUR-RENDER-URL.onrender.com";

export default function ProfileScreen({ userId = 1 }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/gamification/users`);
      const users = await res.json();
      const currentUser = users.find(u => u.id === userId);
      setUser(currentUser);
    } catch (err) {
      Alert.alert("Error fetching profile", err.message);
    }
  };

  if (!user) return <Text>Loading...</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
        {user.name}'s Profile
      </Text>
      <Text>Points: {user.points}</Text>
      <Text style={{ marginTop: 10, fontWeight: "bold" }}>Badges:</Text>
      <FlatList
        data={user.badges}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>- {item}</Text>}
      />
    </View>
  );
}
