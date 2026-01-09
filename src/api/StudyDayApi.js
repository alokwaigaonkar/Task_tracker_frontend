import httpClient from "./httpClient";

export const createOrLoadDay = async (date) => {
  const res = await httpClient.post("/study-days", {
    date,
  });
  return res.data;
};

export const getDayDetail = async (date) => {
  const res = await httpClient.get(`/study-days/${date}`);
  return res.data;
};