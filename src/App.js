import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import MonthView from "./pages/MonthView";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
const [viewMode, setViewMode] = useState("month");

const today = new Date();
const selectedYear = selectedDate
  ? Number(selectedDate.split("-")[0])
  : today.getFullYear();

const selectedMonth = selectedDate
  ? Number(selectedDate.split("-")[1])
  : today.getMonth() + 1;

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