import "../../styles/month.css";

function DaySummaryCard({ day, onClick }) {
  return (
    <div className="day-card" onClick={onClick}>
      <div className="day-number">
        {new Date(day.date).getDate()}
      </div>

      <div className="day-progress">
        <div
          className="day-progress__fill"
          style={{
            width: `${day.completionPercentage}%`,
          }}
        />
      </div>

      <div className="day-stats">
        {day.totalTasks === 0
          ? "No tasks"
          : `${day.completionPercentage}%`}
      </div>
    </div>
  );
}

export default DaySummaryCard;