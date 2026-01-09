import Sidebar from "./Sidebar";
import Header from "./Header";

function MainLayout({
  children,
  viewMode,
  selectedDate,
  onToggleView,
  selectedYear,
  onMonthSelect,
  selectedMonth
}) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
  onMonthSelect={onMonthSelect}
  selectedYear={selectedYear}
  selectedMonth={selectedMonth}
/>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header
          viewMode={viewMode}
          selectedDate={selectedDate}
          onToggleView={onToggleView}
        />
        <main style={{ padding: "20px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;