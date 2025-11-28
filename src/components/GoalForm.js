import React, { useState, useCallback } from "react";
import { ListPlus, Plus } from "lucide-react";
import "../App.css";

/* 목표를 추가*/
const GoalForm = React.memo(({ onAddGoal }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("공부");

  const handleGoalSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!title.trim()) return;
      onAddGoal({ title, category });
      setTitle("");
    },
    [title, category, onAddGoal]
  );

  return (
    <div className="goal-form-section">
      <h3
        className="form-title-border"
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          marginBottom: "1.25rem",
        }}
      >
        새로운 목표 추가
      </h3>
      <form
        onSubmit={handleGoalSubmit}
        style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
        className="sm-flex-row"
      >
        <div className="form-group" style={{ display: "flex" }}>
          <div className="form-input-icon">
            <Plus size={18} />
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="목표 제목 (예: React 기말고사 공부하기)"
            className="form-input"
            style={{ paddingLeft: "2.5rem" }}
            required
          />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select"
            style={{ minWidth: "120px" }}
          >
            <option value="공부">📚 공부</option>
            <option value="운동">💪 운동</option>
            <option value="생활">🏠 생활</option>
            <option value="기타">✨ 기타</option>
          </select>

          <button
            type="submit"
            className="form-submit-btn"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "140px",
            }}
          >
            <span style={{ marginRight: "0.5rem" }}>목표 추가</span>
            <ListPlus size={18} />
          </button>
        </div>
      </form>
    </div>
  );
});

export default GoalForm;
