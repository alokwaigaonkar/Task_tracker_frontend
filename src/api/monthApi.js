import httpClient from "./httpClient";

export const getMonthSummary = async (year, month) => {
  const res = await httpClient.get(
    `/study-days/month?year=${year}&month=${month}`
  );
  return res.data;
};