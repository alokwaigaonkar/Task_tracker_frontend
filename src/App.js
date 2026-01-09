import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import MonthView from "./pages/MonthView";

function App() {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [viewMode, setViewMode] = useState("day");

  const selectedYear = Number(selectedDate.split("-")[0]);
  const selectedMonth = Number(selectedDate.split("-")[1]);

  /* ===============================
     Navigation handlers
     =============================== */

  const handleMonthSelect = (year, month) => {
    const paddedMonth = String(month).padStart(2, "0");
    setSelectedDate(`${year}-${paddedMonth}-01`);
    setViewMode("month");
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setViewMode("day");
  };

  const toggleView = () => {
    setViewMode((prev) =>
      prev === "day" ? "month" : "day"
    );
  };

  return (
    <MainLayout
  viewMode={viewMode}
  selectedDate={selectedDate}
  onToggleView={toggleView}
  onMonthSelect={handleMonthSelect}
  selectedYear={selectedYear}
  selectedMonth={selectedMonth}
>
      {viewMode === "day" ? (
        <Dashboard selectedDate={selectedDate} />
      ) : (
        <MonthView
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          onSelectDate={handleDateSelect}
        />
      )}
    </MainLayout>
  );
}

export default App;