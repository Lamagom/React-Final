import React, { useState, useCallback } from "react";
import { BookOpen, Dumbbell, Home, Coffee } from "lucide-react";

const categoryIcons = {
  공부: <BookOpen size={16} />,
  운동: <Dumbbell size={16} />,
  생활: <Home size={16} />,
  기타: <Coffee size={16} />,
};

const GoalForm = React.memo(({ onAddGoal }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("공부");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!title || !dueDate) return;
      onAddGoal({ title, category, dueDate });
      setTitle("");
      setCategory("공부");
      setDueDate("");
    },
    [title, category, dueDate, onAddGoal]
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", backgroundColor: "#1f1f1f", padding: "1rem", borderRadius: "1rem", border: "1px solid #333" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="목표 제목"
          style={{ flex: 2, padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid #555", backgroundColor: "#222", color: "white" }}
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid #555", backgroundColor: "#222", color: "white" }}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid #555", backgroundColor: "#222", color: "white" }}
        >
          {Object.keys(categoryIcons).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button type="submit" style={{ padding: "0.75rem", borderRadius: "0.75rem", backgroundColor: "#e50914", color: "white", fontWeight: "bold", border: "none" }}>
        목표 추가
      </button>
    </form>
  );
});

export default GoalForm;
