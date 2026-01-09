import httpClient from "./httpClient";

export const addTask = async (goalId, title, estimatedMinutes) => {
  await httpClient.post(`/goals/${goalId}/tasks`, {
    title,
    estimatedMinutes,
  });
};

export const updateTaskCompletion = async (taskId, completed) => {
  await httpClient.patch(`/tasks/${taskId}/completion`, {
    completed,
  });
};

export const deleteTask = async (taskId) => {
  await httpClient.delete(`/tasks/${taskId}`);
};