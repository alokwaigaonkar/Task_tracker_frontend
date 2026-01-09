import "../../styles/task-item.css";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <label className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) =>
            onToggle(task.taskId, e.target.checked)
          }
        />
        <span className="checkmark" />
      </label>

      <span className="task-title">{task.title}</span>
      <span className="task-min">
        {task.estimatedMinutes}m
      </span>

      <button
        className="task-delete"
        onClick={() => onDelete(task.taskId)}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;