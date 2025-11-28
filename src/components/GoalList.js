import React from "react";
import { Info } from "lucide-react";
import GoalItem from "./GoalItem";
import "../App.css";

/**
 * 목표 목록을 그리드 형태로 보여주는 컴포넌트입니다.
 */
const GoalList = React.memo(({ goals, onUpdateProgress, onDelete }) => {
  if (goals.length === 0) {
    return (
      <div className="empty-state">
        <Info size={48} style={{ marginBottom: "1rem", color: "#666" }} />
        <p
          style={{
            fontSize: "1.25rem",
            fontWeight: "500",
            color: "var(--color-text-muted)",
          }}
        >
          현재 예정중인 목표가 없습니다.
        </p>
        <p style={{ fontSize: "0.875rem", marginTop: "0.5rem", color: "#777" }}>
          새로운 목표를 추가하여 GOALFLIX를 시작하세요.
        </p>
      </div>
    );
  }

  return (
    <div className="goal-list-grid">
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onUpdateProgress={onUpdateProgress}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
});

export default GoalList;
