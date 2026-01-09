import { useEffect, useState } from "react";
import DaySummaryCard from "../components/month/DaySummaryCard";
import { getMonthSummary } from "../api/monthApi";
import "../styles/month.css";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";

function MonthView({ selectedYear, selectedMonth, onSelectDate }) {
    const [days, setDays] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const loadMonth = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMonthSummary(
          selectedYear,
          selectedMonth
        );
        setDays(data);
      } catch {
        setError("Failed to load month data");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (!selectedYear || !selectedMonth) return;
      loadMonth();
    }, [selectedYear, selectedMonth]);

  if (loading) return <Loader text="Loading month overview..." />;

if (error) {
  return (
    <ErrorState
      message={error}
      onRetry={() =>
        getMonthSummary(selectedYear, selectedMonth)
      }
    />
  );
}

  /* ===============================
     Group by week (backend aligned)
     =============================== */
  const weeks = days.reduce((acc, day) => {
    acc[day.weekOfMonth] = acc[day.weekOfMonth] || [];
    acc[day.weekOfMonth].push(day);
    return acc;
  }, {});

  return (
    <div className="month-view">
     <h2 className="month-title">
  {new Date(
    selectedYear,
    selectedMonth - 1
  ).toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  })}
</h2>

      {Object.entries(weeks).map(([week, weekDays]) => (
        <div key={week} className="week-group">
          <div className="week-label">
            Week {week}
          </div>

          <div className="week-days">
            {weekDays.map((day) => (
              <DaySummaryCard
                key={day.date}
                day={day}
                onClick={() => onSelectDate(day.date)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MonthView;