import "../styles/header.css";

function Header({ viewMode, selectedDate, onToggleView }) {
  const dateObj = new Date(selectedDate);

  const formattedDate = dateObj.toLocaleDateString(
    "en-IN",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__date">
        {viewMode === "day" && selectedDate && (
  <h2 className="header-date">
    {new Date(selectedDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
  </h2>
)}
        </div>
      </div>

      <div className="header__right">
        <button className="primary-btn" onClick={onToggleView}>
          {viewMode === "day"
            ? "Month View"
            : "Day View"}
        </button>
      </div>
    </header>
  );
}

export default Header;