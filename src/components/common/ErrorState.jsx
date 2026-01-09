function ErrorState({ message, onRetry }) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p
          style={{
            color: "#ef4444",
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          {message}
        </p>
  
        {onRetry && (
          <button className="primary-btn" onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    );
  }
  
  export default ErrorState;