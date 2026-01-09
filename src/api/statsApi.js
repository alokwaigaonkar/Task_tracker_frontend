import httpClient from "./httpClient";

export const getMonthlyStats = async (year, month) => {
  const res = await httpClient.get(
    `/stats/month?year=${year}&month=${month}`
  );
  return res.data;
};