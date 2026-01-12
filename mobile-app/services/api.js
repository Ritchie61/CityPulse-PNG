const API_BASE = "https://citypulse-backend.onrender.com";

export const fetchReports = async () => {
  const response = await fetch(`${API_BASE}/reports`);
  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }
  return response.json();
};

export const createReport = async (data) => {
  const response = await fetch(`${API_BASE}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to create report");
  }
  return response.json();
};
