function Loader({ text = "Loading..." }) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <div
          style={{
            width: 28,
            height: 28,
            border: "3px solid #e5e7eb",
            borderTop: "3px solid #2563eb",
            borderRadius: "50%",
            margin: "0 auto 12px",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <div style={{ color: "#6b7280", fontSize: 14 }}>
          {text}
        </div>
  
        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }
  
  export default Loader;