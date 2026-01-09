import { useEffect, useState } from "react";
import DailyGoalCard from "../components/day/DailyGoalCard";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import AddGoalModal from "../components/modals/AddGoalModal";
import AddTaskModal from "../components/modals/AddTaskModal";
import MonthlyStats from "../components/month/MonthlyStats";
import {
  createOrLoadDay,
  getDayDetail,
} from "../api/StudyDayApi";
import { addGoal, deleteGoal } from "../api/goalApi";
import {
  addTask,
  updateTaskCompletion,
  deleteTask,
} from "../api/taskApi";
import "../styles//dashboard.css";

function Dashboard({ selectedDate }) {
    
const [error, setError] = useState(null);
  const [dayDetail, setDayDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddGoal, setShowAddGoal] = useState(false);
const [showAddTask, setShowAddTask] = useState(false);
const [activeGoalId, setActiveGoalId] = useState(null);

const refreshDay = async () => {
  try {
    setError(null);
    const data = await getDayDetail(selectedDate);
    setDayDetail(data);
  } catch {
    setError("Failed to load day data");
  }
};

useEffect(() => {
  if (!selectedDate) return;

  const loadDay = async () => {
    setLoading(true);
    await createOrLoadDay(selectedDate);
    const data = await getDayDetail(selectedDate);
    setDayDetail(data);
    setLoading(false);
  };

  loadDay();
}, [selectedDate]);
  /* ===============================
     Goal Actions
     =============================== */

  const handleAddGoal = async (title, targetMinutes) => {
    await addGoal(selectedDate, title, targetMinutes);
    await refreshDay();
  };

  const handleDeleteGoal = async (goalId) => {
    await deleteGoal(goalId);
    await refreshDay();
  };

  /* ===============================
     Task Actions
     =============================== */

     const handleAddTask = async (goalId, title, estimatedMinutes) => {
      const tempTask = {
        taskId: Date.now(),
        title,
        estimatedMinutes,
        completed: false,
      };
    
      // UI update first
      setDayDetail(prev => ({
        ...prev,
        goals: prev.goals.map(goal =>
          goal.goalId === goalId
            ? { ...goal, tasks: [...goal.tasks, tempTask] }
            : goal
        )
      }));
    
      try {
        await addTask(goalId, title, estimatedMinutes);
        refreshDay(); // single sync after success
      } catch {
        refreshDay(); // rollback
      }
    };

    const totalTasks =
  dayDetail?.goals.flatMap(g => g.tasks).length || 0;

const completedTasks =
  dayDetail?.goals
    .flatMap(g => g.tasks)
    .filter(t => t.completed).length || 0;

  const handleToggleTask = async (taskId, completed) => {
    // 1️⃣ Update UI instantly
    setDayDetail(prev => ({
      ...prev,
      goals: prev.goals.map(goal => ({
        ...goal,
        tasks: goal.tasks.map(task =>
          task.taskId === taskId
            ? { ...task, completed }
            : task
        )
      }))
    }));
  
    // 2️⃣ Sync backend in background
    try {
      await updateTaskCompletion(taskId, completed);
    } catch {
      // rollback on failure
      refreshDay();
    }
  };

  const handleOpenAddTask = (goalId) => {
    setActiveGoalId(goalId);
    setShowAddTask(true);
  };

  const handleDeleteTask = async (taskId) => {
    setDayDetail(prev => ({
      ...prev,
      goals: prev.goals.map(goal => ({
        ...goal,
        tasks: goal.tasks.filter(t => t.taskId !== taskId)
      }))
    }));
  
    try {
      await deleteTask(taskId);
    } catch {
      refreshDay();
    }
  };

  if (loading) {
    return <Loader text="Loading your tasks..." />;
  }
  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={refreshDay}
      />
    );
  }

  return (
    <div className="dashboard">
  
      {/* Monthly stats always visible */}
      <MonthlyStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />
  
      {/* Add Goal button always visible */}
      <button
        className="add-goal-btn"
        onClick={() => setShowAddGoal(true)}
      >
        + Add Goal
      </button>
  
      {/* Empty State */}
      {dayDetail.goals.length === 0 && (
        <div className="empty-state">
          <h3>No goals for this day</h3>
          <p className="text-muted">
            Start by adding your first goal.
          </p>
        </div>
      )}
  
      {/* Goal cards */}
      {dayDetail.goals.map((goal) => (
        <DailyGoalCard
          key={goal.goalId}
          goal={goal}
          onAddTask={handleOpenAddTask}
          onDeleteGoal={handleDeleteGoal}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      ))}
  
      {/* Modals */}
      {showAddGoal && (
        <AddGoalModal
          onClose={() => setShowAddGoal(false)}
          onSubmit={handleAddGoal}
        />
      )}
  
      {showAddTask && (
        <AddTaskModal
          goalId={activeGoalId}
          onClose={() => setShowAddTask(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
}

export default Dashboard;