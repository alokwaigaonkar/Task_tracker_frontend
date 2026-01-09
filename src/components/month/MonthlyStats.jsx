import "../../styles/stats.css";

function MonthlyStats({ totalTasks, completedTasks }) {
  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks * 100) / totalTasks);

  return (
    <div className="monthly-stats">
      <div className="stats-header">
        <span>Monthly Progress</span>
        <span>{completionPercentage}%</span>
      </div>

      <div className="progress-bar">
        <div
          className={`progress-fill ${
            completionPercentage >= 80 ? "success" : ""
          }`}
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      <div className="stats-footer">
        {completedTasks} Completed · {totalTasks} Total
      </div>
    </div>
  );
}

export default MonthlyStats;