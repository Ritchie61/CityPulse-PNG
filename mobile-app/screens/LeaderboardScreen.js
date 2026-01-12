import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert } from "react-native";

const API_BASE = "https://YOUR-RENDER-URL.onrender.com";

export default function LeaderboardScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`${API_BASE}/gamification/users`);
      const data = await res.json();
      const sorted = data.sort((a, b) => b.points - a.points);
      setUsers(sorted);
    } catch (err) {
      Alert.alert("Error fetching leaderboard", err.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
        Leaderboard
      </Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Text>
            {index + 1}. {item.name} - {item.points} pts
          </Text>
        )}
      />
    </View>
  );
}
