const API_BASE = "https://YOUR-RENDER-URL.onrender.com";

export const fetchReports = async () => {
  const response = await fetch(`${API_BASE}/reports`);
  if (!response.ok) throw new Error("Failed to fetch reports");
  return response.json();
};
