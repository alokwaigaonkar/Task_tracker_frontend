import TaskItem from "./TaskItem";
import "../../styles/goal-card.css";

function DailyGoalCard({
  goal,
  onAddTask,
  onDeleteGoal,
  onToggleTask,
  onDeleteTask,
}) {
  const completedMinutes = goal.tasks
    .filter(t => t.completed)
    .reduce((sum, t) => sum + t.estimatedMinutes, 0);

  const progress =
    goal.targetMinutes === 0
      ? 0
      : Math.min(
          (completedMinutes / goal.targetMinutes) * 100,
          100
        );

  return (
    <div className="goal-card">
      <div className="goal-card__header">
        <h3 className="goal-title">{goal.title}</h3>
        <button
          className="primary-btn"
          onClick={() => onDeleteGoal(goal.goalId)}
          title="Delete goal"
          style={{marginLeft:"auto"}}
        >
          Delete
        </button>
        <button
          className="task-delete"
          onClick={() => onDeleteGoal(goal.goalId)}
        >
          ✕
        </button>
      </div>

      <div className="goal-progress">
        <div
          className="goal-progress__fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="goal-tasks">
        {goal.tasks.map(task => (
          <TaskItem
            key={task.taskId}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>

      <button
  className="add-task-btn"
  onClick={() => {
    onAddTask(goal.goalId);
  }}
>
  + Add Task
</button>
    </div>
  );
}

export default DailyGoalCard;