import React, { useMemo } from "react";
import { BookOpen, Dumbbell, Home, Coffee, Trash2 } from "lucide-react";

const categoryIcons = {
  공부: <BookOpen size={16} />,
  운동: <Dumbbell size={16} />,
  생활: <Home size={16} />,
  기타: <Coffee size={16} />,
};

const GoalItem = React.memo(({ goal, onUpdateProgress, onDelete }) => {
  const today = useMemo(() => new Date(), []);
  const due = useMemo(() => new Date(goal.dueDate), [goal.dueDate]);
  const daysLeft = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  const status = useMemo(() => {
    if (goal.progress >= 100) return { text: "완료", color: "#22c55e" };
    if (goal.progress > 0) return { text: "진행중", color: "#facc15" };
    return { text: "보류", color: "#a1a1aa" };
  }, [goal.progress]);

  return (
    <div className="goal-item" style={{ borderRadius: "1rem", backgroundColor: "#1f1f1f", border: "1px solid #333", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: "bold", fontSize: "1rem" }}>{goal.title}</span>
        <button onClick={() => onDelete(goal.id)} style={{ backgroundColor: "rgba(31,31,31,0.7)", borderRadius: "0.5rem", padding: "0.25rem", border: "none", cursor: "pointer" }}>
          <Trash2 size={16} color="#e50914" />
        </button>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        {categoryIcons[goal.category]}
        <span style={{ fontSize: "0.875rem", color: "#ccc" }}>{goal.category}</span>
      </div>
      <div style={{ fontSize: "0.75rem", color: daysLeft <= 2 ? "#e50914" : "#aaa" }}>
        D-{daysLeft >= 0 ? daysLeft : "마감"} ({goal.dueDate})
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={goal.progress}
        onChange={(e) => onUpdateProgress(goal.id, Number(e.target.value))}
        style={{ width: "100%", accentColor: status.color }}
      />
      <div style={{ fontSize: "0.75rem", fontWeight: "bold", color: status.color }}>{status.text}</div>
    </div>
  );
});

export default GoalItem;
