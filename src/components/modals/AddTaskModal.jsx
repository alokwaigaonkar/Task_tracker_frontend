import { useState } from "react";
import Modal from "../common/Modal";

function AddTaskModal({ goalId, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !estimatedMinutes) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onSubmit(
        goalId,
        title,
        Number(estimatedMinutes)
      );
      onClose();
    } catch {
      setError("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Add Task" onClose={onClose}>
      <form onSubmit={handleSubmit} className="modal-form">
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />

        <input
          type="number"
          placeholder="Estimated minutes"
          value={estimatedMinutes}
          onChange={(e) =>
            setEstimatedMinutes(e.target.value)
          }
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
            {loading ? "Adding..." : "Add Task"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddTaskModal;