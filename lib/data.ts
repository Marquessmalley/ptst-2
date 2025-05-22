// FETCH SERVICES - this could be listed above component
export const fetchServices = async (selectedVehicle: string) => {
  const response = await fetch(
    "http://localhost:3000/api/square/listServices",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // <- important
      },
      body: JSON.stringify({ selectedVehicle }),
    }
  );
  const data = response.json();
  return data;
};
