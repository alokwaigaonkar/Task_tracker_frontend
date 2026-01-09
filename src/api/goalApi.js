import httpClient from "./httpClient";

export const addGoal = async (date, title, targetMinutes) => {
  await httpClient.post(`/study-days/${date}/goals`, {
    title,
    targetMinutes,
  });
};

export const deleteGoal = async (goalId) => {
  await httpClient.delete(`/goals/${goalId}`);
};