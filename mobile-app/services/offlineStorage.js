import AsyncStorage from "@react-native-async-storage/async-storage";

const OFFLINE_REPORTS_KEY = "OFFLINE_REPORTS";

export const saveOfflineReport = async (report) => {
  try {
    const existing = await getOfflineReports();
    const updated = [...existing, report];
    await AsyncStorage.setItem(
      OFFLINE_REPORTS_KEY,
      JSON.stringify(updated)
    );
  } catch (err) {
    console.error("Failed to save offline report", err);
  }
};

export const getOfflineReports = async () => {
  try {
    const data = await AsyncStorage.getItem(OFFLINE_REPORTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const clearOfflineReports = async () => {
  await AsyncStorage.removeItem(OFFLINE_REPORTS_KEY);
};
