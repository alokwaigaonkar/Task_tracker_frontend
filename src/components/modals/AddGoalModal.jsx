import { useState } from "react";
import Modal from "../common/Modal";
import "../../styles/modal.css";

function AddGoalModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [targetMinutes, setTargetMinutes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !targetMinutes) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onSubmit(title, Number(targetMinutes));
      onClose();
    } catch {
      setError("Failed to add goal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Add Daily Goal" onClose={onClose}>
      <form onSubmit={handleSubmit} className="modal-form">
        <input
          placeholder="Goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />

        <input
          type="number"
          placeholder="Target minutes"
          value={targetMinutes}
          onChange={(e) => setTargetMinutes(e.target.value)}
          disabled={loading}
        />

        {error && (
          <div className="form-error">{error}</div>
        )}

        <div className="flex-between">
          <button
            type="button"
            className="primary-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Goal"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddGoalModal;