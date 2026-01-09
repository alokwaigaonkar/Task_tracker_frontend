import httpClient from "./httpClient";

export const getAvailableMonths = async () => {
  const res = await httpClient.get(
    "/study-days/available-months"
  );
  return res.data.years;
};