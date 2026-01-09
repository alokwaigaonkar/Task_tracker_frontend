import { useEffect, useState } from "react";
import { getAvailableMonths } from "../api/sidebarApi";
import "../styles/sidebar.css";

function Sidebar({ onMonthSelect, selectedYear, selectedMonth }) {
  const [years, setYears] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMonths = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAvailableMonths();
        setYears(data);
      } catch {
        setError("Failed to load months");
      } finally {
        setLoading(false);
      }
    };

    loadMonths();
  }, []);

  if (loading) {
    return <aside className="sidebar">Loading…</aside>;
  }

  if (error) {
    return <aside className="sidebar">{error}</aside>;
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__title">TASK TRACKER</div>

      {Object.entries(years).map(([year, months]) => (
        <div key={year} className="sidebar__section">
          <div className="sidebar__year">{year}</div>

          {months.map((month) => {
            const isActive =
              Number(year) === selectedYear &&
              month === selectedMonth;

            return (
              <div
                key={month}
                className={`sidebar__month ${
                  isActive ? "active" : ""
                }`}
                onClick={() =>
                  onMonthSelect(Number(year), month)
                }
              >
                {new Date(
                  2000,
                  month - 1
                ).toLocaleString("en-IN", {
                  month: "long",
                })}
              </div>
            );
          })}
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;