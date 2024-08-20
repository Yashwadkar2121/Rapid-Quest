const API_URL = "http://localhost:5000/api/analytics"; // Replace with your actual API endpoint

export const fetchCLVByCohorts = async () => {
  const response = await fetch(`${API_URL}/customer-lifetime-value`);
  return response.json();
};
